import axios from 'axios'
import store from '../state/stores/configureStore'

const getArticles = async () => {
  let auth_headers = JSON.parse(localStorage.getItem('credentials'))
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
  let auth_headers = JSON.parse(localStorage.getItem('credentials'))
  event.preventDefault()
  let params = {
    title: event.target.title.value,
    teaser: event.target.teaser.value,
    body: event.target.body.value.split('\n\n'),
    article_type: event.target.article_type.value,
    category: selectValue.toLowerCase(),
    location: event.target.location.value
  }
  try {
    let response = await axios.post('/admin/articles', params, { headers: auth_headers })
    store.dispatch({ type: "SUCCESS_MESSAGE", payload: response.data.message })
    return true
  } catch (error) {
    let message = error.response ? error.response.data.message : error.message
    store.dispatch({ type: "FORM_MESSAGE", payload: message })
  }
}

export { createArticle, getArticles }