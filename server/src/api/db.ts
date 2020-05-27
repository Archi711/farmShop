import sql from 'mssql/msnodesqlv8'

const pool = new sql.ConnectionPool({
  database: 'farmShop',
  server: 'localhost\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})


export default pool