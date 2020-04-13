const moment = require('moment-timezone')
moment.tz.setDefault('UTC')

const IG = require('./lib/ig')
const { getMidPrice } = require('./lib/math')
const { timeframes, markets } = require('./lib/config')
const C = require('./lib/constants')

class IGTrader {

  constructor(igParams) {
    const { apiKey, username, password, type } = igParams
    const isDemo = type === 'demo'
    this.username = username
    this.password = password
    this.ig = new IG(apiKey, isDemo)
  }

  static removeCurrentCandle(data) {
    const sortedData = data.sort((oldest, newest) => moment(oldest.timestamp).diff(moment(newest.timestamp)))
    sortedData.pop()
    return sortedData
  }

  async initialise() {
    if (!this.loggedIn) {
      try {
        await this.ig.login(this.username, this.password)
        this.loggedIn = true
      } catch (error) {
        console.error('Error with ig-trader initialise', error)
      }
    }
  }

  async logout() {
    if (this.loggedIn) {
      await this.ig.logout()
      this.loggedIn = false
    }
  }

  async createPosition(createObj) {
    await this.initialise()
    try {
      return this.ig.post('positions/otc', 2, createObj)
    } catch (error) {
      console.error(error)
    }
  }

  async editPosition(dealId, editObj) {
    await this.initialise()
    try {
      return this.ig.put(`positions/otc/${dealId}`, 2, editObj)
    } catch (error) {
      console.error(error)
    }
  }

  async closePosition(closeObj) {
    await this.initialise()
    try {
      return this.ig.delete('positions/otc', 1, closeObj)
    } catch (error) {
      console.error(error)
    }
  }

  async currentPositions() {
    await this.initialise()
    try {
      const positionsObj = await this.ig.get('positions', 2)
      return positionsObj.positions
    } catch (error) {
      console.error(error)
    }
  }

  async historical({ pair, timeframe, datapoints = 1 }) {
    try {
      await this.initialise()
      const [{ epic }] = markets.filter(market => market.instrumentName === pair && market.epic)
      if (!epic || timeframes.indexOf(timeframe) === -1) {
        console.error(`Issue with epic: '${epic}' or timeframe no found: '${timeframe}'`)
        return []
      }

      // const pricesObj = await this.ig.get(`prices/${epic}/${timeframe}/${datapoints + 1}`, 2)
      const pricesObj = await this.ig.get(`prices/${epic}?resolution=${timeframe}&pageSize=${datapoints + 1}`, 3)

      const { prices, metadata: { allowance }} = pricesObj
      const { remainingAllowance, totalAllowance, allowanceExpiry } = allowance
      const formattedExpiry = (moment.duration(allowanceExpiry, 'seconds').asDays()).toFixed(1)
      console.log(`IG Allowance: ${remainingAllowance} (Remaining) ${totalAllowance} (Total) ${formattedExpiry} Days (Expiry)`)
      if (!prices || prices.length === 0) throw new Error(`Error with IG response - returned prices: ${prices}`)

      const formattedPrices = prices.map(price => {
        const close = getMidPrice(price.closePrice.bid, price.closePrice.ask)
        const open = getMidPrice(price.openPrice.bid, price.openPrice.ask)
        const mid = getMidPrice(open, close)

        const snapshotTimeUTC = moment(price.snapshotTimeUTC, 'YYYY-MM-DD[T]HH:mm:ss')

        return {
          id: C.historicalID({ pair, timeframe }),
          timestamp: snapshotTimeUTC.unix(),
          datetime: snapshotTimeUTC.format(C.DATETIME_FORMAT),
          close,
          open,
          mid,
          high: getMidPrice(price.highPrice.bid, price.highPrice.ask),
          low: getMidPrice(price.lowPrice.bid, price.lowPrice.ask)
        }
      })
      return IGTrader.removeCurrentCandle(formattedPrices)

    } catch (error) {
      console.error(`Error with pair: ${pair}. ${error}`)
    }
  }

  async market(epic) {
    await this.initialise()
    try {
      return this.ig.get(`markets/${epic}`, 2)
    } catch (error) {
      console.error(error)
    }
  }

  async markets() {
    await this.initialise()
    try {
      const epics = markets.map(m => m.epic).join(',')
      const marketsObj = await this.ig.get('markets', 2, { epics })
      const { marketDetails } = marketsObj
      if(!marketDetails) {
        console.log(`NO marketDetails found, full markets response = ${JSON.stringify(marketsObj)}`)
      }
      const dateUpdated = moment().format(C.DATE_FORMAT)

      return marketDetails.map(offer => {

        const updateTimeUTC = moment(offer.snapshot.updateTime, 'HH:mm:ss')

        return {
          currency: offer.instrument.name,
          currentPrice: getMidPrice(offer.snapshot.bid, offer.snapshot.offer),
          timeUpdated: updateTimeUTC.format(C.TIME_FORMAT),
          dateUpdated,
          timestamp: moment(`${dateUpdated} / ${updateTimeUTC.format('HH:mm:ss')}`, C.DATETIME_FORMAT).unix()
        }
      }
      )
    } catch (error) {
      console.error(error)
    }
  }

  async searchMarkets(searchTerm) {
    await this.initialise()
    try {
      const { markets } = await this.ig.get('markets', 1, { searchTerm })
      return markets
    } catch (error) {
      console.error(error)
    }
  }

  async activity({ minutesAgo }) {
    await this.initialise()
    const past = moment().subtract(minutesAgo, 'minutes')
    const lastPeriod = moment().diff(past)
    try {
      const { activities } = await this.ig.get(`history/activity/${lastPeriod}`, 1)
      return activities
    } catch (error) {
      console.error(error)
    }
  }

  async transactions({ minutesAgo }) {
    await this.initialise()
    const past = moment().subtract(minutesAgo, 'minutes')
    const lastPeriod = moment().diff(past)
    try {
      const { transactions } = await this.ig.get(`history/transactions/ALL_DEAL/${lastPeriod}`, 1)
      return transactions
    } catch (error) {
      console.error(error)
    }
  }

  async confirm({ dealReference }) {
    await this.initialise()
    try {
      return await this.ig.get(`/confirms/${dealReference}`, 1)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = IGTrader
