import { Router } from 'express'
import Query from '../api'
import models from '../api/models'
import CartItem from '../api/types/cartItem'
import pool from '../api/db'
import UpdateType from '../api/types/updateType'
import ConditionType from '../api/types/conditionType'

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

router.post("/products/order", async (req, res) => {
  let IDOrder: number
  const orderQ = new Query()
    .insert(models.Order, [req.body.UserID, req.body.TotalPrice])
  await pool.request().query(orderQ.run())
    .then(v => IDOrder = v.recordset[0].OrderID)
    .catch(e => {
      res.status(500).send({ code: 3 })
      return
    })
  const updates = req.body.cartItems.map(
    (item: CartItem) => {
      const updateQ = new Query()
        .update(models.Product, models.Product.Quantity, item.quantity, UpdateType.dec)
        .where([models.Product.ProductID], ConditionType.EQUAL, [item.itemID])
      const historyQ = new Query()
        .insert(models.ProductHistory, [item.quantity, IDOrder, item.itemID])
      return new Promise<void>(async (resolve, reject) => {
        try {
          await pool.request().query(updateQ.run())
          await pool.request().query(historyQ.run())
          resolve()
        }
        catch (e) {
          reject()
        }
      })
    }
  )

  Promise.all(updates)
    .then(v => res.status(200).send("updated"))
    .catch(e => res.status(500).send({ code: 3 }))
})

export default router