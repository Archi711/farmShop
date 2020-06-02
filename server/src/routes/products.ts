import { Router } from 'express'
import Query from '../api'
import models from '../api/models'
import pool from '../api/db'

const router = Router()

const getProducts = new Query()
.select(
  [models.Product.ProductID,
    models.Product.ProductName,
    models.ProductType.ProductTypeName,
    models.Product.Quantity,
    models.Product.Price,
    models.Product.ImageURL,
    models.Farm.FarmName,
    models.Product.Description
  ])
.from().join([
  [models.Product.IDType, models.ProductType.ProductTypeID],
  [models.Product.IDFarm, models.Farm.FarmID]
])
router.get("/products", (req, res) => {
  pool.request().query(getProducts.run()).then(result => {
    res.status(200).send(result.recordset)
  })
})

export default router