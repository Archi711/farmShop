import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { StateContext } from '../../store'


export default function PrivateRoute(props : any){
  const store = useContext(StateContext)
  return (
    <Route
      path={props.path}
      render={
        ({location}) =>
          store.state.auth ?
            props.children :
            <Redirect to={{pathname:"/login", state:{ from: location }}} />
      }>
    </Route>
  )
}