// tslint:disable-next-line:no-console

import express from 'express'
import sql from 'mssql/msnodesqlv8'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


const pool = new sql.ConnectionPool({
  database: 'farmShop',
  server: 'localhost\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})

pool.connect().then(() => {
  pool.request().query('select * from [Farms]', (err, result) => {
      // tslint:disable-next-line:no-console
        console.log(result)
  })
})
// tslint:disable-next-line:no-console
const server = app.listen(process.env.APPPORT, () => console.log("RUN!") )
