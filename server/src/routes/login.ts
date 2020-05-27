import { Router } from 'express'
import queryBuilder from '../api'
import pool from '../api/db'
import models from '../api/models'
import ConditionType from '../api/types/conditionType'

const router = Router()

router.post("/login", (req, res) => {
  const getUser = new queryBuilder()
    .select([models.User.Name, models.User.Surname, models.User.Nick])
    .from()
    .where([models.User.Password, models.User.Nick], ConditionType.EQUAL, [req.body.password, req.body.nick])

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