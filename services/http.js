const axios = require('axios')
const options = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
}
const http = axios.create(options)

module.exports = http
