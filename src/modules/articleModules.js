import axios from 'axios'
import store from '../state/stores/configureStore'

const createArticle = async event => {
  let auth_headers = JSON.parse(localStorage.getItem('credentials'))
  event.preventDefault()
  let params = {
    title: event.target.title.value,
    teaser: event.target.teaser.value,
    body: event.target.body.value.split('\n\n'),
    article_type: event.target.article_type.value.toLowerCase(),
    category: event.target.category.value,
    location: event.target.location.value
  }
  try {
    let response = await axios.post('/articles', params, { headers: auth_headers })
    store.dispatch({ type: "CREATE_ARTICLE", payload: response.data.message })
  } catch (error) {
    let message = error.response ? error.response.data.message : error.message
    store.dispatch({ type: "CREATE_ARTICLE", payload: message })
  }
}

export { createArticle }