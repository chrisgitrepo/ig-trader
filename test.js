const moment = require('moment-timezone')
moment.tz.setDefault('Europe/London');

const data = [
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1550620800,
    "datetime": "20-Feb-19 / 00:00:00",
    "close": 9441.8,
    "open": 9468.6,
    "mid": 9455.2,
    "high": 9470.7,
    "low": 9424.3
  },
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1550707200,
    "datetime": "21-Feb-19 / 00:00:00",
    "close": 9401.4,
    "open": 9442.1,
    "mid": 9421.75,
    "high": 9489.45,
    "low": 9319
  },
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1550966400,
    "datetime": "24-Feb-19 / 00: 00: 00",
    "close": 9398.8,
    "open": 9375.5,
    "mid": 9387.15,
    "high": 9400.95,
    "low": 9364.55
  },
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1550793600,
    "datetime": "22-Feb-19 / 00: 00: 00",
    "close": 9363.8,
    "open": 9401.5,
    "mid": 9382.65,
    "high": 9424.4,
    "low": 9358
  },
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1551052800,
    "datetime": "25-Feb-19 / 00: 00: 00",
    "close": 9456.8,
    "open": 9398.6,
    "mid": 9427.7,
    "high": 9470.5,
    "low": 9373.3
  },
  {
    "id": "AUD/CAD-DAY",
    "timestamp": 1551139200,
    "datetime": "26-Feb-19 / 00: 00: 00",
    "close": 9439.7,
    "open": 9457,
    "mid": 9448.35,
    "high": 9459.8,
    "low": 9438.5
  }
]

const d = data.sort((oldest, newest) => moment(oldest.timestamp).diff(moment(newest.timestamp)))
d.pop()

console.log(JSON.stringify(d));