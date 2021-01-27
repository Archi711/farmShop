import * as React from 'react'
import { Dispatch } from 'react'
import axios from 'axios'

const API_ADDRESS = "http://localhost:3001"

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
export type OrderData = {
  cartItems: CartItem[],
  UserID: number,
  TotalPrice: string,
}
export type Action =
  { type: 'LOGIN', payload: LoginData, status?: number, response?: any } |
  { type: 'LOGOUT' } |
  { type: 'REGISTER', payload: RegisterData, status?: number } |
  { type: 'TOGGLE_LOADING' } |
  { type: 'FETCH_PRODUCTS', status?: number, response?: any } |
  { type: 'SET_ACTIVE_PRODUCT', payload: number } |
  { type: 'ADD_TO_CART', payload: CartItem } |
  { type: 'REMOVE_FROM_CART', payload: number } |
  { type: 'MAKE_ORDER', payload: OrderData, status?: number, response?: any }
export interface Product {
  ProductID: number,
  ProductName: string,
  ProductTypeName: string,
  Quantity: number,
  Price: number,
  ImageURL: string,
  FarmName: string,
  Description: string,
}

export interface CartItem {
  itemID: number,
  quantity: number,
  price: number,
}

export interface User {
  UserID: number,
  Name: string,
  Surname: string,
  Nick: string,
  Address: string,
  City: string,
  ZipCode: number,
}

export interface AppState {
  auth: boolean,
  isLoading: boolean,
  error: Error | null,
  products: Product[] | null,
  activeProduct: Product | null,
  cart: CartItem[],
  user: User | null,
}
export const initialState: AppState = {
  auth: false,
  isLoading: false,
  error: null,
  products: null,
  activeProduct: null,
  cart: [],
  user: null,
}

export const asyncMiddleware = (dispatch: Dispatch<Action>) => async (action: Action) => {
  dispatch({ type: "TOGGLE_LOADING" })
  switch (action.type) {
    case "LOGIN": {
      new Promise(async (resolve, reject) => {
        try {
          let res = await axios.post(API_ADDRESS + "/login", {
            nick: action.payload.login,
            password: action.payload.password
          })
          if (res.status === 200) {
            action.status = 200
            action.response = res.data
            resolve(res)
          }
        }
        catch (e) {
          reject()
        }
      })
        .finally(() => dispatch(action))
      break
    }

    case "REGISTER": {
      let data = action.payload as RegisterData
      new Promise<void>(async (resolve, reject) => {
        try {
          let res = await axios.post(API_ADDRESS + "/register", {
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
          })
          res.status === 200 ? resolve() : reject()
        }
        catch (e) {
          reject()
        }
      })
        .then(v => {
          action.status = 200
          dispatch(action)
        }).catch(e => {
          action.status = 404
          dispatch(action)
        })
      break
    }
    case "FETCH_PRODUCTS": {
      new Promise((resolve, reject) => {
        axios.get(API_ADDRESS + "/products")
          .then(res => res.status === 200 ? resolve(res.data) : reject())
          .catch(e => reject())
      })
        .then(v => {
          action.response = v;
          action.status = 200;
          dispatch(action)
        })
        .catch(e => {
          action.status = 500;
          dispatch(action)
        })
      break
    }
    case "MAKE_ORDER": {
      await new Promise<void>((resolve, reject) => {
        axios.post(API_ADDRESS + "/products/order", {
          cartItems: action.payload.cartItems,
          UserID: action.payload.UserID,
          TotalPrice: action.payload.TotalPrice
        })
          .then(res => {
            action.status = res.status
            resolve()
          })
          .catch(res => {
            action.status = res.status
            action.response = res
            reject()
          })
      })
      dispatch(action)
      break;
    }
    default: dispatch(action)
  }
}

export const reducer = (state: AppState, action: Action): AppState => {
  state = { ...state, isLoading: false }
  switch (action.type) {
    case "LOGIN": {
      if (action.status === 200) {
        return {
          ...state,
          auth: true,
          error: null,
          user: action.response.values[0]
        }
      }
      else return {
        ...state,
        auth: false,
        error: new Error(1)
      }
    }
    case "LOGOUT": {
      return initialState
    }
    case "REGISTER": {
      if (action.status === 200) return { ...state, auth: false, error: null }
      else return {
        ...state,
        auth: false,
        error: new Error(3)
      }
    }
    case "FETCH_PRODUCTS": {
      return action.status === 200 ?
        {
          ...state,
          products: action.response
        } :
        {
          ...state,
          error: new Error(3)
        }
    }
    case "MAKE_ORDER": {
      return action.status === 200 ?
        {
          ...state,
          cart: [],
          activeProduct: null,
        } :
        {
          ...state,
          error: new Error(action.response.code)
        }
    }
    case "SET_ACTIVE_PRODUCT": {
      return {
        ...state,
        activeProduct: state.products ? state.products.filter(p => p.ProductID === action.payload)[0] : null
      }
    }
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((e, i) => e.itemID !== action.payload)
      }
    }

    case "TOGGLE_LOADING": {
      return {
        ...state,
        isLoading: true
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