const IGTrader = require('../src')

const igParams = {
  apiKey: 'e0d4f0c6a2eab817d0d654eedfe1d04efff69904',
  username: 'rcrDemo',
  password: 'rcrDemo123',
  type: 'demo'
}
// jest.mock('../src/lib/ig')

describe('IGTrader', () => {
  test('should create an igTrader with valid constructor', async () => {
    const { apiKey, username, password } = igParams
    const igTrader = new IGTrader(igParams)

    const data = await igTrader.historical({
      pair: 'AUD/CAD',
      timeframe: 'HOUR_4',
      datapoints: 2
    })



    console.log(JSON.stringify(data));
    // expect(igTrader.username).toBe(username)
    // expect(igTrader.password).toBe(password)
    // expect(igTrader.ig.apiKey).toBe(apiKey)
    // expect(igTrader.ig.isDemo).toBeTruthy()
  })
})

