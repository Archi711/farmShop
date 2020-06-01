import * as React from 'react'
import Button from '../../common/Button/Button'
import Input from '../../common/Input/Input'
import { StateContext } from '../../../store'
import { useModal, Modal } from '../../common/Modal/Modal'
import { Link } from 'react-router-dom'
import * as spinner from '../../../../../load.svg'
import './Register.css'

export default function Register() {
  const store = React.useContext(StateContext)
  const [isLoading, setLoading] = React.useState(false)
  const { isShowing, toggle } = useModal(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let data = new FormData(e.target as HTMLFormElement)
    store.dispatch({
      type: 'REGISTER',
      payload: {
        login: data.get('login') as string,
        password: data.get('password') as string,
        email: data.get('email') as string,
        name: data.get('name') as string,
        surname: data.get('surname') as string,
        address: data.get('address') as string,
        city: data.get('city') as string,
        zipCode: data.get('zipCode') as string,
      }
    })
    toggle();
  }
  

  React.useEffect(() => {
    setLoading(store.state.isLoading)
  }, [store.state.isLoading, store.state.error])

  return (
    <>
      <Modal isShowing={isShowing} toggle={toggle}>
        {
          isLoading ? "Loading..." :
          !store.state.error ? "Błąd!" : <div>Rejestracja powiodła się! <Link to="/login">Zaloguj się!</Link></div>
        }
      </Modal>
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1 className="registerForm__heading">FarmShop</h1>
        <h2 className="registerForm__subHeading">Rejestracja</h2>
        <div className="registerForm__fieldsetContainer">
          <fieldset className="registerForm__fieldset registerForm__personalInFields">
            <Input
              type="text"
              required={true}
              name="login"
              labelText="Login: "
            ></Input>
            <Input
              type="text"
              required={true}
              name="password"
              labelText="Hasło: "
            ></Input>
            <Input
              type="email"
              required={true}
              name="email"
              labelText="E-mail: "
            ></Input>
            <Input
              type="text"
              required={true}
              name="name"
              labelText="Imię: "
            ></Input>
            <Input
              type="text"
              required={true}
              name="surname"
              labelText="Nazwisko: "
            ></Input>
          </fieldset>
          <fieldset className="registerForm__fieldset registerForm__addressInFields">
            <Input
              type="text"
              required={true}
              name="address"
              labelText="Adres: "
            ></Input>
            <Input
              type="text"
              required={true}
              name="city"
              labelText="Miasto: "
            ></Input>
            <Input
              type="text"
              required={true}
              name="zipCode"
              labelText="Kod pocztowy: "
              pattern='[0-9]{2}-[0-9]{3}'
            ></Input>
          </fieldset>
        </div>
        <Button
          variant='primary'
          name='submit'
          type='submit'
          className='registerForm__submitBtn'>
          Zarejestruj</Button>
      </form>
    </>
  )
}