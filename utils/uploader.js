let upyun = new Upyun(configs.bucket, configs.operator, configs.password, 'v0', 'legacy')

exports.upload = (path, file, type) => {
  return new Promise((resolve, reject) => {
    upyun.uploadFile(path, file, type, true, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.remove = (path) => {
  return new Promise((resolve, reject) => {
    upyun.removeFile(path, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
