import React, { useContext, useState } from 'react'
import { StateContext } from '../../../store'
import ProductDesc from '../ProductDesc/ProductDesc'
import "./ProductBrowser.css"
import Button from '../../common/Button/Button'
import Input from '../../common/Input/Input'
import { useModal, Modal } from '../../common/Modal/Modal'

export default function ProductBrowser(){
  const store = useContext(StateContext)
  const [quantity, setQuantity] = useState(0)
  const {isShowing, toggle} = useModal(false)
  const inputChange = (e : React.FormEvent<HTMLInputElement>) => {
      setQuantity(+(e.target as HTMLInputElement).value)
  }

  const handleBuySubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuantity(0)
    store.dispatch({
      type : "ADD_TO_CART",
      payload : {
        itemID : store.state.activeProduct?.ProductID as number,
        quantity : quantity,
        price : quantity * (store.state.activeProduct?.Price as number)
      }
    })
    toggle()
  }

  return (
    store.state.activeProduct ? 

    <section className="productBrowser">
      <Modal isShowing={isShowing} toggle={toggle}>Produkt dodano do koszyka!</Modal>
      <img 
        src={store.state.activeProduct.ImageURL} 
        className="productBrowser__img"
        alt={store.state.activeProduct.ProductName} />
      <h2 className="productBrowser__nameHeading">{store.state.activeProduct.ProductName}</h2>
      <section className="productBrowser__details">
        <ProductDesc label="Opis produktu" data={store.state.activeProduct.Description} />
        <ProductDesc label="Typ produktu" data={store.state.activeProduct.ProductTypeName} />
        <ProductDesc label="Z farmy" data={store.state.activeProduct.FarmName} />
        <div className="productBrowser__buyPanel">
          <ProductDesc 
            className="buyPanel__label"
            label="Dostępna ilość" 
            data={store.state.activeProduct.Quantity} />
          <ProductDesc 
            className="buyPanel__label"
            label="Cena" 
            data={store.state.activeProduct.Price} />
          <form className="buyPanel__form" onSubmit={handleBuySubmit}>
          <Input
            type="number"
            name="buyQuantity"
            required={true}
            onChange={inputChange}
            value={quantity}
            labelText="Ilość: "
            minValue={0}
            maxValue={store.state.activeProduct.Quantity}
            />
          <Button 
              variant="secondary"
              name="buyBtn"
              className="buyPanel__buyBtn">
            Kup!
          </Button>
          </form>
        </div>
      </section>
    </section> 
    : 
    <h1 className="productBrowser__emptyNotif">Wybierz produkt z listy, aby wyświeltić szczegóły</h1>
  )
}