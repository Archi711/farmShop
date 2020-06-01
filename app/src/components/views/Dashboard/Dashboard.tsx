import React from 'react'
import Button from '../../common/Button/Button'

export default function Dashboard(){
  return (
    <>
      <header className="header">
        <h1 className="header__heading">Farm Shop</h1>
        <Button 
          type="button" 
          variant="primary"
          className="header__logoutBtn"
          name="logout">Wyloguj</Button>
        <span>Koszyczek</span>
      </header>
      <main></main>
      <footer></footer>
    </>
  )
}