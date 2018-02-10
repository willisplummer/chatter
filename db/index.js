const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chatter';
const config = { connectionString }

const pool = new Pool(config)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
