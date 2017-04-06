if (process.env.NODE_ENV == 'production') {
  module.exports = require('./production')
} else if (process.env.NODE_ENV == 'prerelease') {
  module.exports = require('./prerelease')
} else {
  module.exports = require('./development')
}
