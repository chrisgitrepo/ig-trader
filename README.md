# igclient
Minimalist Node.js client for programmatically spread betting with the IG API

# Installation

`npm install --save ig-trader`

# Import

You can import one or many clients depending on what you need:

ES6 Import:

`import IGTrader from 'ig-trader'`

CommonJS:

`const IGTrader = require('ig-trader')`

# Usage

```
const trader = new IGTrader({
  apiKey: 'ig-api-key',
  username: 'ig-username',
  password: 'ig-password',
  type: 'demo' //rename to anything else for production
})

const trade = async (obj) => {
  return await createPosition(obj)
}

trade({
  epic: 'CS.D.GBPUSD.TODAY.IP',
  currencyCode: 'GBP',
  direction: 'BUY,
  expiry" 'DFB',
  forceOpen: 'true',
  guaranteedStop: 'false',
  orderType: 'MARKET',
  size: 1
})
```