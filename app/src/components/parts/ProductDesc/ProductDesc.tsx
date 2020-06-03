import React from 'react'
import "./ProductDesc.css"
export interface ProductDescProps{
  label : string;
  data : string | number
  className? : string
}

export default function ProductDesc(props: ProductDescProps){
  let short = typeof props.data === "number"
  let className = props.className ? props.className : ""
  return (
    <div className={"productDesc "+className}>
      <h4 className="productDesc__heading">
        {props.label}:
        {short ? "\t"+props.data : ""}
      </h4>
      {
        !short ? <span className="productDesc__details">{props.data}</span> : "" 
      }
    </div>
  )
}