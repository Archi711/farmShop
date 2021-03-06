import * as React from 'react'
import Button from '../../common/Button/Button'
import Input from '../../common/Input/Input'
import { Link, Redirect } from 'react-router-dom'
import { StateContext } from '../../../store'
import { useModal, Modal } from '../../common/Modal/Modal'
import './Login.css'


export default function Login() {
  const store = React.useContext(StateContext)
  const [isLoading, setLoading] = React.useState(false)
  const { isShowing, toggle } = useModal(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)

    store.dispatch({
      type: "LOGIN",
      payload: {
        login: data.get("login") as string,
        password: data.get("password") as string
      }
    })
  }
  React.useEffect(() => {
    setLoading(store.state.isLoading)
  }, [store.state.isLoading])

  React.useEffect(() => {
    if (store.state.error) toggle()
  }, [store.state.error, toggle])

  return store.state.auth ? <Redirect to="/"></Redirect> : (
    <form onSubmit={handleSubmit} className="loginForm">
      <h1 className="loginForm__heading">FarmShop</h1>
      <Input
        type="text"
        required={true}
        labelText="Login:"
        name="login" />
      <Input
        type="password"
        required={true}
        labelText="Hasło:"
        name="password" />
      <Button
        className="loginForm__submitBtn"
        name='submit'
        type="submit"
        variant="primary">
        {isLoading ? "Loading..." : "Zaloguj"}
      </Button>
      <div className="loginForm__footer">
        jeśli nie masz konta
        <Link to="/register"> zarejestruj się</Link>
      </div>
      <Modal isShowing={isShowing} toggle={toggle}>{store.state.error?.msg}</Modal>
    </form>
  )
}