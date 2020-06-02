import React from 'react'
import { Product } from '../../../store';

export interface ProductListElementProps {
  product : Product
}

export default function ProductListElement(props : ProductListElementProps){
  return (
    <div>{props.product.ProductName}</div>
  )
}