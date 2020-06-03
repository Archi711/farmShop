import React from 'react'
import Button from '../../common/Button/Button'
import ProductList from '../../parts/ProductList/ProductList'
import ProductBrowser from '../../parts/ProductBrowser/ProductBrowser'
import { StateContext } from '../../../store'
import "./Dashboard.css"

export default function Dashboard(){
  const store = React.useContext(StateContext)
  const handleClick = (e : React.MouseEvent) => {
    store.dispatch({
      type : "LOGOUT"
    })
  }
  return (
    <>
      <header className="header">
        <div className="header__heading"> 
          <h1>Farm Shop</h1>
        </div>
        <div className="header__icons">
          <Button 
            type="button" 
            variant="primary"
            className="header__logoutBtn"
            onClick={handleClick}
            name="logout">Wyloguj</Button>
          <span>Koszyczek ({store.state.cart.length})</span>
        </div>
      </header>
      <main className="main">
        <ProductList></ProductList>
        <ProductBrowser></ProductBrowser>
      </main>
    </>
  )
}