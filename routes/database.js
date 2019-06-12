const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'portfolio'
})

pool.getConnection((err, connection) => {
  if (err) {
      console.log(err)
    }
  if (connection) {
    connection.release()
  }
  return
})

pool.query = util.promisify(pool.query)
module.exports = pool