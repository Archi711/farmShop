
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import pool from './api/db'
import routes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes.login)
app.use(routes.register)

pool.connect().then(() => {
  // tslint:disable-next-line:no-console
  app.listen(process.env.APP_PORT, () => console.log(`App on port: ${process.env.APP_PORT}`) )
})

