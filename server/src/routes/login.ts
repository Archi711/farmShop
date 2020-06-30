import { Router } from 'express'
import queryBuilder from '../api'
import pool from '../api/db'
import models from '../api/models'
import ConditionType from '../api/types/conditionType'

const router = Router()

router.post("/login", (req, res) => {
  const getUser = new queryBuilder()
    .select([models.User.UserID, models.User.Name, models.User.Surname, models.User.Nick, models.Address.Address, models.Address.City, models.Address.ZipCode])
    .from()
    .join([[models.User.IDAddress, models.Address.AddressID]])
    .where([models.User.Password, models.User.Nick, models.User.isAdmin], ConditionType.EQUAL, [req.body.password, req.body.nick, req.body.isAdmin])

  pool.request().query(getUser.run()).then((v) => {
    if (v.recordset.length === 1) {
      res.send({ values: v.recordset })
    }
    else {
      res.status(404).send()
    }
  }).catch(e => console.error(e))
})

export default router