const timeframes = ['SECOND', 'MINUTE', 'MINUTE_2', 'MINUTE_3', 'MINUTE_5', 'MINUTE_15', 'MINUTE_30', 'HOUR', 'HOUR_2', 'HOUR_3', 'HOUR_4', 'DAY', 'WEEK', 'MONTH']
const markets = [{
  epic: 'CS.D.GBPUSD.TODAY.IP',
  instrumentName: 'GBP/USD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1.2,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.USDJPY.TODAY.IP',
  instrumentName: 'USD/JPY',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.EURGBP.TODAY.IP',
  instrumentName: 'EUR/GBP',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1.2,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.EURJPY.TODAY.IP',
  instrumentName: 'EUR/JPY',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1.8,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.EURUSD.TODAY.IP',
  instrumentName: 'EUR/USD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.GBPJPY.TODAY.IP',
  instrumentName: 'GBP/JPY',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2.8,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.AUDJPY.TODAY.IP',
  instrumentName: 'AUD/JPY',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1.6,
  retailMarginPct: 0.05
}, {
  epic: 'CS.D.AUDUSD.TODAY.IP',
  instrumentName: 'AUD/USD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 1,
  retailMarginPct: 0.05
}, {
  epic: 'CS.D.USDCAD.TODAY.IP',
  instrumentName: 'USD/CAD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.EURAUD.TODAY.IP',
  instrumentName: 'EUR/AUD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2.1,
  retailMarginPct: 0.05
}, {
  epic: 'CS.D.GBPAUD.TODAY.IP',
  instrumentName: 'GBP/AUD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2.2,
  retailMarginPct: 0.05
}, {
  epic: 'CS.D.CADJPY.TODAY.IP',
  instrumentName: 'CAD/JPY',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2.8,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.EURCAD.TODAY.IP',
  instrumentName: 'EUR/CAD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 3.3,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.GBPCAD.TODAY.IP',
  instrumentName: 'GBP/CAD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 3.8,
  retailMarginPct: 0.033
}, {
  epic: 'CS.D.AUDCAD.TODAY.IP',
  instrumentName: 'AUD/CAD',
  instrumentType: 'CURRENCIES',
  expiry: 'DFB',
  maxSpread: 2.3,
  retailMarginPct: 0.05
}]

module.exports = { timeframes, markets }
