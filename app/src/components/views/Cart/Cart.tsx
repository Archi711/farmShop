import React, { useContext } from 'react'
import Header from '../../parts/Header/Header'
import CartItemsTable from '../../parts/CartItemsTable/CartItemsTable'
import { StateContext } from '../../../store'
import Button from '../../common/Button/Button'
import { Modal, useModal } from '../../common/Modal/Modal'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function Cart() {
  const store = useContext(StateContext)
  const history = useHistory()
  const [isLoading, setLoading] = React.useState(false)
  const { isShowing, toggle } = useModal(false)

  const handleOrder = () => {
    store.dispatch({
      type: "MAKE_ORDER",
      payload : {
        cartItems : store.state.cart,
        UserID : store.state.user?.UserID || 1,
        TotalPrice : store.state.cart.reduce((acc, el) => acc += el.price, 0).toFixed(2)
      }
    })
    toggle()
  }
  React.useEffect(() => {
    setLoading(store.state.isLoading)
  }, [store.state.isLoading, store.state.error])

  const handleGoBack = () => history.push("/");
  return (
    <>
      <Modal isShowing={isShowing} toggle={toggle}>
        {
          isLoading ? "Wczytywanie..." :
          store.state.error ? store.state.error.msg : <div>Zamówienie złożone! <Link to="/">Wróć do zakupów</Link></div>
        }
      </Modal>
      <Header />
      <div className="cart">
        <CartItemsTable className="cart__itemsTable"/>
        <section className="cart__details">
          <h3 className="details__heading">Adres wysyłki:</h3>
          <div>{store.state.user?.Address}</div>
          <div>{store.state.user?.City}</div>
          <div>{store.state.user?.ZipCode}</div>
        </section>
        <Button 
          className="cart__submit" 
          name="submit" 
          onClick={handleOrder}
          variant="secondary">
            Złóż zamówienie
        </Button>
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