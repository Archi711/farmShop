import React from 'react'
import { CartItem, Product } from '../../../store'
import Button from '../../common/Button/Button'

export interface CartItemProps {
  item : CartItem,
  data? : Product,
  delete : (id? : number) => void,
}

export default function CartItemRow(props : CartItemProps){

  return (
    <tr>
      <td>
        <Button 
          variant="warning" 
          name="delete" 
          onClick={() => props.delete(props.data?.ProductID)}>
            X
        </Button>
      </td>
      <td>{props?.data?.ProductName}</td>
      <td>{props.item.quantity}</td>
      <td>{props.item.price}</td>
    </tr>
  )
}