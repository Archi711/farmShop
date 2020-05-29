import * as React from 'react'
import { Dispatch } from 'react'
import axios from 'axios'


export interface AppState {
  auth : boolean
}
export type LoginData = {login : string, password : string}
export type RegisterData = {
  login : string,
  password : string,
  email : string,
  name : string,
  surname : string,
  address : string,
  city : string,
  zipCode : string
}
export type Action = 
  { type: 'LOGIN', payload : LoginData, status? : number, response? : any}  |
  { type: 'REGISTER', PAYLOAD : RegisterData, status? : number }

export const initialState : AppState = {
  auth : false,
}

export const asyncMiddleware = (dispatch : Dispatch<Action>) => (action : Action) => {
  switch(action.type){
    case "LOGIN" : {
      let data = new Promise((resolve, reject) => {
        axios.post("http://localhost:3001/login", {
          nick : action.payload.login,
          password : action.payload.password
        }).then(res => {
          if(res.status === 200){
            action.status = 200
            action.response = res
            resolve(res)
          } 
          else reject()
        }).catch(e => reject(e)).then(() => dispatch(action))
      })
    }
  }
}

export const reducer = (state : AppState, action : Action) : AppState => {
  switch(action.type){
    case "LOGIN" : {
      if(action.status === 200) return {...state, auth : true}
      else return {...state, auth : false}
    }
    default: {
      console.log("reducer!")
      return state
    }
  }
}

interface Context {
  dispatch : Dispatch<Action>
  state : AppState
}


export const StateContext = React.createContext<Context>({state : initialState, dispatch : () => {}})