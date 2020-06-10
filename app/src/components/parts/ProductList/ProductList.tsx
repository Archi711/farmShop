import React, { useContext, useState } from 'react'
import "./ProductList.css"
import ProductListElement from '../ProductListElement/ProductListElement'
import { StateContext } from '../../../store'
import Input from '../../common/Input/Input'

export default function ProductList(){
  const store = useContext(StateContext)
  const [filter, setFilter] = useState("")
  const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value
    setFilter(value)
  }

  React.useEffect(() => {
    store.dispatch({
      type : "FETCH_PRODUCTS"
    })
  },[])

  return (
    <section className="productList">
      <h3 className="productList__heading">Lista produktów:</h3>
      <Input type="text" name="filter" labelText="Wyszukaj:" required={false} onChange={handleChange}/>
      <ul className="productList__list">
      {
        store.state.products ? 
          store.state.products.filter(product => product.ProductName.toLocaleLowerCase().includes(filter))
                              .map((product,idx) => <ProductListElement product={product} key={idx} idx={product.ProductID}/>)
        : ""
      }
      </ul>
    </section>
  )
}