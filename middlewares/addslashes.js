module.exports = (req, res, next) => {
  Object.keys(req.query).forEach(key => {
    req.query[key] = req.query[key].replace(/('|"|<|>)/g, '\\$1')
  })
  Object.keys(req.params).forEach(key => {
    req.params[key] = req.params[key].replace(/('|"|<|>)/g, '\\$1')
  })
  Object.keys(req.body).forEach(key => {
    if (typeof req.body === 'string') req.body[key] = req.body[key].replace(/('|"|<|>)/g, '\\$1')
  })
  next()
}
