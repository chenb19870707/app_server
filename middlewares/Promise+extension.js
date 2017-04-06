Promise.assign = object => {
  return new Promise((resolve, reject) => {
    if (! _.isPlainObject(object)) return reject()
    let n = 0
    let o = {}
    _.map(object, (value, key) => {
      if (! Object(value).then) return _.set(o, key, value)
      n ++
      value.then(v => {
        n --
        _.set(o, key, v)
        if (n == 0) resolve(o)
      }, e => {
        reject(e)
      })
    })
  })
}