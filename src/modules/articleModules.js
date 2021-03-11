import axios from 'axios'
import store from '../state/stores/configureStore'
import toBase64 from './imageEncoder'

const getArticles = async () => {
  let auth_headers = JSON.parse(localStorage.getItem('auth-storage'))
  try {
    let response = await axios.get('/admin/articles', { headers: auth_headers })
    if (response.data.articles) {
      store.dispatch({ type: "FETCH_ARTICLES", payload: response.data.articles })
    } else {
      store.dispatch({ type: "DASHBOARD_MESSAGE", payload: response.data.message })
    }
  } catch (error) {
    store.dispatch({ type: "DASHBOARD_MESSAGE", payload: error.message })
  }
}

const createArticle = async (event, selectValue) => {
  let auth_headers = JSON.parse(localStorage.getItem('auth-storage'))
  event.preventDefault()
  let params = extractFormValues(event, selectValue)
  try {
    let response = await axios.post('/admin/articles', params, { headers: auth_headers })
    store.dispatch({ type: "SUCCESS_MESSAGE", payload: response.data.message })
    return true
  } catch (error) {
    let message = error.response ? error.response.data.message : error.message
    store.dispatch({ type: "FORM_MESSAGE", payload: message })
  }
}

const updateArticle = async (event, selectValue, id) => {
  let auth_headers = JSON.parse(localStorage.getItem('auth-storage'))
  event.preventDefault()
  let params = await extractFormValues(event, selectValue)
  try {
    let response = await axios.put(`/admin/articles/${id}`, params, { headers: auth_headers })
    store.dispatch({ type: "SUCCESS_MESSAGE", payload: response.data.message })
    return true
  } catch (error) {
    let message = error.response ? error.response.data.message : error.message
    store.dispatch({ type: "FORM_MESSAGE", payload: message })
  }
}

const extractFormValues = async (event, selectValue) => {
  let encodedImage
  if (event.target.image.files[0]) {
    encodedImage = await toBase64(event.target.image.files[0])
  }
  let params = {
    title: event.target.title.value,
    teaser: event.target.teaser.value,
    body: event.target.body.value.split('\n\n'),
    article_type: event.target.article_type.value,
    category: selectValue && selectValue.toLowerCase(),
    location: event.target.location.value,
    image: encodedImage
  }
  return params
}

export { createArticle, getArticles, updateArticle }