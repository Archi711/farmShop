import { Router } from 'express'
import queryBuilder from '../api'
import models from '../api/models'
import pool from '../api/db'
const router = Router()

router.post("/register", async (req, res) => {
  const address = req.body.address
  const regData = req.body.regData

  const addressQuery = new queryBuilder()
  .insert(models.Address, address)

  let IDAddress : number

  await pool.request().query(addressQuery.run())
    .then(v => IDAddress = v.recordset[0].AddressID)
    .catch(e => {
      res.status(500).send("error \n"+e)
      return
    })

  const registerQuery = new queryBuilder()
  .insert(models.User, [...regData, IDAddress])
  .test()

  await pool.request().query(registerQuery.run())
  .then(v => res.send("Success!"))
  .catch(e => {
    res.status(500).send("error \n"+e)
    return
  })
})

export default router