import React from 'react'
import './Input.css'

export interface InputProps{
  type: "text" | "email" | "number" | "password"
  required : boolean
  name : string
  labelText : string
  className? : string
}

export default function Input(props : InputProps){
  return (
    <div className={`input ${props.className}`}>
      <label className="input__label">{props.labelText}</label>
      <input
        className="input__field" 
        type={props.type}
        required={props.required}
        name={props.name}
        ></input>
    </div>
  )
}