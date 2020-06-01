import React from 'react'
import './Input.css'

export interface InputProps{
  type: "text" | "email" | "number" | "password"
  required : boolean
  name : string
  labelText : string
  className? : string | string[]
  pattern? : string
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
    if(!ev.target.value) return;
    if(ev.target.validity.valid) {
      let tmp = controlClassNames.filter(el => el !== "input__field-invalid")
      tmp.push("input__field-valid")
      setControlClassNames(tmp)
    }
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
        ></input>
    </div>
  )
}