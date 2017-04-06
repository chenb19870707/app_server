exports.mysql = (db = 'tenminidb') => {
  let pool = require('mysql').createPool(configs.mysql[db])

  return sql => new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) return reject(err)
      conn.query(sql, (err, result) => {
        conn.release()
        err ? reject(err) : resolve(result)
      })
    })
  })
}

exports.knex = (() => {
  const conns = new Proxy({}, {
    get: (target, key) => {
      if (! target[key]) {
        target[key] = require('knex')({
          client: 'mysql',
          connection: configs.mysql[key]
        })
      }
      return target[key]
    }
  })

  return (db = 'tenminidb')=> conns[db] 
})()

exports.redis = () => require('redis').createClient(configs.redis)
