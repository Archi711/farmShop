import React, { useContext }from 'react'
import { StateContext} from '../../../store'
import CartItemRow from '../CartItem/CartItem'
import './CartItemsTable.css'


export default function CartItemsTable(props : any){
  const store = useContext(StateContext)

  const handleDelete = (id? : number) => {
    store.dispatch({
      type : "REMOVE_FROM_CART",
      payload : id as number
    })
  }
  return (
    <table className={`cartTable ${props.className}`}>
      <caption className="cartTable__caption">Zamówienie</caption>
      <thead className="cartTable__thead">
        <tr>
          <td></td>
          <td>Informacje o produkcie</td>
          <td>Ilość</td>
          <td>Cena</td>
        </tr>
      </thead>
      <tbody className="cartTable__tbody">
        {store.state.cart.map(
          (el, idx) => 
              <CartItemRow delete={handleDelete} data={store.state.products?.filter(p => p.ProductID === el.itemID)[0]} item={el} key={idx}/>
        )}
      </tbody>
      <tfoot className="cartTable__tfoot">
        <tr>
          <td></td>
          <td colSpan={2}>Suma</td>
          <td colSpan={2}>{(store.state.cart.reduce((acc, el) => acc += el.price, 0)).toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  )
}