const C = {
  DATE_FORMAT: 'DD-MMM-YY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'DD-MMM-YY / HH:mm:ss',
  historicalID: ({ pair, timeframe }) => `${pair}-${timeframe}`,
}

module.exports = C
