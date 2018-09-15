const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'hackathonpostgres',
    host: 'postgres-hackathon.eastus2.cloudapp.azure.com',
    database: 'storekeepersdb',
    password: 'hackathon2018rappipsql',
    port: 5432,
  })

  module.exports = pool;