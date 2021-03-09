import Auth from "./auth";
import axios from 'axios'
import store from '../state/stores/configureStore'

const auth = new Auth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
});

const signingIn = async (event) => {
  event.preventDefault()
  let credentials = {
    email: event.target.email.value,
    password: event.target.password.value
  }
  try {
    let response = await auth.signIn(credentials.email, credentials.password)
    debugger
    store.dispatch({ type: "AUTHENTICATE", payload: response.data })
  } catch (error) {
    return error.response ? error.response.data.errors : error.message
  }
}

const validateToken = async () => {
  try {
    let auth_headers = JSON.parse(localStorage.getItem('auth-storage'))
    let response = await axios.get('/admin_auth/validate_token', { headers: auth_headers })
    store.dispatch({ type: "AUTHENTICATE", payload: response.data.data })
  } catch (error) {
  }
}

export { signingIn, validateToken }