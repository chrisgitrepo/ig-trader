const moment = require('moment-timezone')
moment.tz.setDefault('Europe/London');

const utc = moment.tz(moment(), moment.ISO_8601, 'Etc/UTC')

const london = moment.tz(utc, moment.ISO_8601, 'Europe/London')



// myTime.format() //2016-08-30T22:00:00-06:00

// const sameTimeDifferentZone = moment.tz(myTime.format('YYYY-MM-DDTHH:mm:ss.SSS'), moment.ISO_8601, 'America/New_York')

// sameTimeDifferentZone.format() //2016-08-30T22:00:00-04:00

console.log(JSON.stringify(utc.format('DD-MM-YY HH:mm')));
console.log(JSON.stringify(london.format('DD-MM-YY HH:mm')));
console.log(JSON.stringify(london.unix()));