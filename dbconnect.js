const config = {
    user: 'sa',
    password: 'As1597307',
    database: 'arttest',
    server: 'LAPTOP-UT67GJ0L',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }

module.exports = config;