import React from 'react'
import Button from '../../common/Button/Button'
import ProductList from '../../parts/ProductList/ProductList'
import ProductBrowser from '../../parts/ProductBrowser/ProductBrowser'
import "./Dashboard.css"

export default function Dashboard(){
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
            name="logout">Wyloguj</Button>
          <span>Koszyczek</span>
        </div>
      </header>
      <main className="main">
        <ProductList></ProductList>
        <ProductBrowser></ProductBrowser>
      </main>
    </>
  )
}