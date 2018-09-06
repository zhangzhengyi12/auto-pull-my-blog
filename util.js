const moment = require('moment')
function nowTime() {
  return moment().format('YYYY-MM-DD--HH:mm:ss')
}

module.exports = {
  nowTime
}
