import * as React from 'react'
import { Dispatch } from 'react'
import axios from 'axios'


export interface AppState {
  auth: boolean,
  isLoading: boolean,
  error: Error | null
}
type ErrorCode = 1 | 2 | 3
enum ErrorMessage {
  "Logowanie nie powiodło się - sprawdź dane i spróbuj ponownie" = 1,
  "Rejestracja nie powiodła się",
  "Błąd wewnętrzny serwera"
}
export class Error {
  code: ErrorCode
  msg: string
  constructor(code: ErrorCode) {
    this.code = code
    this.msg = ErrorMessage[code]
  }
}

export type LoginData = { login: string, password: string }
export type RegisterData = {
  login: string,
  password: string,
  email: string,
  name: string,
  surname: string,
  address: string,
  city: string,
  zipCode: string
}
export type Action =
  { type: 'LOGIN', payload: LoginData, status?: number, response?: any } |
  { type: 'REGISTER', payload: RegisterData, status?: number } |
  { type: 'TOGGLE_LOADING' }

export const initialState: AppState = {
  auth: false,
  isLoading: false,
  error: null,
}

export const asyncMiddleware = (dispatch: Dispatch<Action>) => (action: Action) => {
  dispatch({type : "TOGGLE_LOADING"})
  switch (action.type) {
    case "LOGIN": {
      new Promise((resolve, reject) => {
        axios.post("http://localhost:3001/login", {
          nick: action.payload.login,
          password: action.payload.password
        }).then(res => {
          if (res.status === 200) {
            action.status = 200
            action.response = res
            resolve(res)
          }
          else reject()
        }).catch(e => reject(e)).then(() => dispatch(action))
      })
      break
    }

    case "REGISTER": {
      let data = action.payload as RegisterData
      new Promise((resolve, reject) => {
        axios.post("http://localhost:3001/register", {
          address: [
            data.address,
            data.city,
            data.zipCode
          ],
          regData: [
            data.login,
            data.password,
            data.email,
            data.name,
            data.surname
          ]
        }).then(res => res.status === 200 ? resolve() : reject())
          .catch(e => reject())
      }).then(v => {
        action.status = 200
        dispatch(action)
      }).catch(e => {
        action.status = 404
        dispatch(action)
      })
      break
    }
  }
}

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "LOGIN": {
      if (action.status === 200) return { ...state, auth: true, isLoading: false, error : null }
      else return {
        auth: false,
        isLoading: false,
        error: new Error(1)
      }
    }
    case "REGISTER": {
      if (action.status === 200) return { ...state, auth: false, isLoading: false, error : null }
      else return {
        auth: false,
        isLoading: false,
        error: new Error(3)
      }
    }
    case "TOGGLE_LOADING" : {
      return {
        ...state,
        isLoading : true
      }
    }
    default: {
      console.log("reducer!")
      return state
    }
  }
}

interface Context {
  dispatch: Dispatch<Action>
  state: AppState
}


export const StateContext = React.createContext<Context>({ state: initialState, dispatch: () => { } })