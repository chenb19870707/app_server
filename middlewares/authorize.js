module.exports = (req, res, next) => {
  try {
    if (! req.cookies.token) return res.failure(ERRORS.REQUEST_UNAUTHORIZED)
    req.user = jwt.verify(req.cookies.token.replace('Bearer ', ''), constants.TOKEN_KEY)
  } catch (err) {
    console.error(err)
    return res.failure(ERRORS.REQUEST_UNAUTHORIZED)
  }
  next()
}
