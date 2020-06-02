import React from 'react'
import { Product } from '../../../store'
import "./ProductListElement.css"
import { StateContext } from '../../../store'

export interface ProductListElementProps {
  product : Product,
  idx : number
}

export default function ProductListElement(props : ProductListElementProps){
  const store = React.useContext(StateContext)
  const handleClick = (e : React.MouseEvent) => {
    store.dispatch({
      type: "SET_ACTIVE_PRODUCT",
      payload : props.idx
    })
  }

  return (
    <li className="productListElement" onClick={handleClick}>
      <h3 className="productListElement__heading">
        {props.product.ProductName}
      </h3>
      <img 
        className="productListElement__img" 
        src={props.product.ImageURL} 
        alt={'productImage '+props.product.ProductName.toLocaleLowerCase("pl")}/>
    </li>
  )
}