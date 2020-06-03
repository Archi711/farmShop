import React from 'react'
import './Input.css'

export interface InputProps{
  type: "text" | "email" | "number" | "password"
  required : boolean
  name : string
  labelText : string
  className? : string | string[]
  pattern? : string
  minValue? : number | string
  maxValue? : number | string
  value? : string | number,
  onChange? : (e : React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props : InputProps){
  let classNames = ["input"]
  const [controlClassNames, setControlClassNames] = React.useState(["input__field"])
  if(props.className){
    Array.isArray(props.className) ?
      classNames.push(...props.className as string[]) :
      classNames.push(props.className)
  }
  

  const handleChange = (ev : React.ChangeEvent<HTMLInputElement>) => {
    if(props.onChange) props.onChange(ev)
    if(!ev.target.value) return;
    let valid = "input__field-valid"
    let invalid = "input__field-invalid"
    let replaceClasses = (c1 : string, c2 : string) => {
      let tmp = controlClassNames.filter(el => el !== c1)
      if(!tmp.includes(c2)) tmp.push(c2)
      setControlClassNames(tmp)
    }
    
    ev.target.validity.valid ? 
    replaceClasses(invalid, valid) : 
    replaceClasses(valid, invalid)
  }
  const handleInvalid = (ev : React.ChangeEvent<HTMLInputElement>) => {
    let tmp = controlClassNames.filter(el => el !== "input__field-valid")
    tmp.push("input__field-invalid")
    setControlClassNames(tmp)
  }


  return (
    <div className={classNames.join(" ")}>
      <label className="input__label">{props.labelText}</label>
      <input
        className={controlClassNames.join(" ")} 
        type={props.type}
        onChange={handleChange}
        onInvalid={handleInvalid}
        required={props.required}
        name={props.name}
        pattern={props.pattern}
        min={props.minValue}
        max={props.maxValue}
        value={props.value}
        ></input>
    </div>
  )
}