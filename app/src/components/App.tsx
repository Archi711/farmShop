import React from 'react'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Dashboard from './views/Dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { reducer, StateContext, initialState, asyncMiddleware } from '../store'
import PrivateRoute from './common/PrivateRoute'

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = {state, dispatch : asyncMiddleware(dispatch)}
  return (
    <StateContext.Provider value={value}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        </Switch>
      </Router>
    </StateContext.Provider>
  )
}

export default App;
