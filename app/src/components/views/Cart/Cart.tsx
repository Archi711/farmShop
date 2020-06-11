import React, { useContext } from 'react'
import Header from '../../parts/Header/Header'
import CartItemsTable from '../../parts/CartItemsTable/CartItemsTable'
import { StateContext } from '../../../store'
import Button from '../../common/Button/Button'
import './Cart.css'
import { useHistory } from 'react-router-dom'

export default function Cart() {
  const store = useContext(StateContext)
  const history = useHistory()

  const handleGoBack = () => {
    history.push("/");
  }
  return (
    <>
      <Header />
      <div className="cart">
        <CartItemsTable className="cart__itemsTable"/>
        <section className="cart__details">
          <h3 className="details__heading">Adres wysyłki:</h3>
          <div>{store.state.user?.Address}</div>
          <div>{store.state.user?.City}</div>
          <div>{store.state.user?.ZipCode}</div>
        </section>
        <Button className="cart__submit" name="submit" variant="secondary">Złóż zamówienie</Button>
        <Button 
          className="cart__goBack"
          onClick={handleGoBack}
          variant="primary" 
          name="goBack">
            Powrót
        </Button>
      </div>
    </>
  )
}