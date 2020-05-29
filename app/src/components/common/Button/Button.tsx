import React, { ReactChild } from 'react'
import './Button.css'

export interface ButtonProps{
  variant : "primary" | "secondary"
  name: string
  handler? : () => any
  children : ReactChild
  type? : "submit" | "reset" | "button" 
  className? : string
}

export default function Button(props : ButtonProps){

  let classnames = props.variant === "primary" ? "btn-primary" : "btn-secondary"
  return (
    <button
      type={props.type}
      onClick={props.handler}
      name={props.name}
      className={`btn ${classnames} ${props.className}`}>
      {props.children}
    </button>
  )
}