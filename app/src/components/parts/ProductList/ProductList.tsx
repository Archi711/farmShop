import React, { useContext } from 'react'
import "./ProductList.css"
import ProductListElement from '../ProductListElement/ProductListElement'
import { StateContext } from '../../../store'

export default function ProductList(){
  const store = useContext(StateContext)

  React.useEffect(() => {
    store.dispatch({
      type : "FETCH_PRODUCTS"
    })
  },[])
  return (
    <section className="productList">
      <h3 className="productList__heading">Lista produktów:</h3>
      <ul className="productList__list">
      {
        store.state.products ? 
        store.state.products.map((product,idx) => <ProductListElement product={product} key={idx} idx={idx} />): ""
      }
      </ul>
    </section>
  )
}