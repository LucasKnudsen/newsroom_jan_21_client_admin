import axios from 'axios'
import store from '../state/stores/configureStore'

const signIn = async (event) => {
  event.preventDefault()
  let credentials = {
    email: event.target.email.value,
    password: event.target.password.value
  }
  try {
    let response = await axios.post('/admin_auth/sign_in', credentials)
    let userCredentials = {
      uid: response.headers['uid'],
      access_token: response.headers['access-token'],
      client: response.headers['client'],
      expiry: response.headers['expiry'],
      token_type: 'Bearer'
    }
    localStorage.setItem('credentials', JSON.stringify(userCredentials))
    store.dispatch({ type: "AUTHENTICATE", payload: response.data.data })
  } catch (error) {
    return error.response ? error.response.data.errors : error.message
  }
}

const validateToken = async () => {
  try {
    let auth_headers = JSON.parse(localStorage.getItem('credentials'))
    let response = await axios.get('/admin_auth/validate_token', { headers: auth_headers })
    store.dispatch({ type: "AUTHENTICATE", payload: response.data.data })
  } catch (error) {

  }

}

export { signIn, validateToken }