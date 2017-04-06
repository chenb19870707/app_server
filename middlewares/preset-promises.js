const Promise = require('bluebird')
Promise.promisifyAll(require('redis'))
Promise.promisifyAll(require('request'))