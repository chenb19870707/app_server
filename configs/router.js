module.exports = app => {
  app.use('/5.0/treasure', require('../api/treasure/treasure.routes'))
}
