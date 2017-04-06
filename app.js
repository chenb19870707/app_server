// const favicon = require('serve-favicon');

const app = express()

require('./utils/logger')

app.set('env', process.env.NODE_ENV)

// view engine setup
app.set('views', path.resolve('views'))
app.set('view engine', 'jade')

app.use(log4js.connectLogger(
  require('./utils/logger')('http'),
  { level: 'auto', format: ':method :url' }))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve('public')))

app.use(require('./middlewares/api-response'))
app.use(require('./middlewares/addslashes'))
app.use(require('./middlewares/uidchecker'))
require('./middlewares/preset-promises')
require('./configs/router')(app)
require('./middlewares/Promise+extension')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
