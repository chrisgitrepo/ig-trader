const moment = require('moment')

const minutesAgo = 60

const past = moment().subtract(minutesAgo, 'minutes')
const timeSince = moment().diff(past)

console.log(timeSince)