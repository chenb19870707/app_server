module.exports = {

  mysql: {
    tenminidb: {
      host: '10.6.11.252',
      user: 'gms',
      password: 'N9acrtTG2AxZpeDz',
      database: 'tenminidb',
      dateStrings: true
    },
    records: {
      host: '10.6.21.11',
      user: 'tenmini',
      password: 'j3VKKKfXN46EsPz2',
      dateStrings: true
    },
    base: {
      host: '10.6.11.252',
      user: 'gms',
      password: 'N9acrtTG2AxZpeDz',
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
    host: '10.6.19.209',
    port: 6379
  },

  serviceHost: 'http://api.tenmini.com/4.0',

  logLevel: 'INFO'

};
