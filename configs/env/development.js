module.exports = {
  mysql: {
    tenminidb: {
      host: '106.75.55.252',
      user: 'taf',
      password: 'taf2015',
      database: 'tenminidb',
      dateStrings: true
    },
    records: {
      host: '106.75.55.252',
      user: 'taf',
      password: 'taf2015',
      database: 'tenminidb',
      dateStrings: true
    },
    base: {
      host: '106.75.55.252',
      user: 'taf',
      password: 'taf2015',
      dateStrings: true
    }
  },

  upyun: {
    baseUrl: 'http://paopaowebfile.b0.upaiyun.com',
    bucket: 'paopaowebfile',
    operator: 'tenmini',
    password: 'Ten123456'
  },

  redis: {
    host: '127.0.0.1',
    port: 6379
  },

  serviceHost: 'http://api.tenmini.com:8000/4.0',

  logLevel: 'DEBUG'

};
