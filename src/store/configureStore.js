if (process.env.NODE_ENV === 'production') {
  module.exports = require('./createStoreProd')
}
else {
  module.exports = require('./createStoreDev')
}
