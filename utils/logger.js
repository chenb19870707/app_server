let catagories = [
  'treasure',
]

let appenders = _.map(catagories, c => {
  return {
    type: 'file',
    filename: `./logs/${c}.log`,
    maxLogSize: 20480,
    backups: 7,
    category: c
  }
})

appenders = _.concat(appenders, { type: 'console' })

log4js.configure({
  appenders,
  levels: {
    '[all]': configs.logLevel
  }
})

module.exports = category => log4js.getLogger(category)
