import React, { ReactChild } from 'react'
import './Button.css'

export interface ButtonProps{
  variant : "primary" | "secondary" | "warning" | "danger"
  name: string
  handler? : () => any
  children : ReactChild
  type? : "submit" | "reset" | "button" 
  className? : string
}

export default function Button(props : ButtonProps){
  return (
    <button
      type={props.type}
      onClick={props.handler}
      name={props.name}
      className={`btn btn-${props.variant} ${props.className}`}>
      {props.children}
    </button>
  )
}