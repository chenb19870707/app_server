const fn = (logger, err, req, res) => {
  if (err instanceof assert.AssertionError) {
    err = err.message
  }

  logger.error(err, req.url, req.body)
  res.failure(err)
}

module.exports = (controller, logger) => {
  _.forEach(controller, (v, k) => controller[k] = (req, res) => v(req, res).catch(err => fn(logger, err, req, res)))
}