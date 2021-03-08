import initialState from '../stores/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: true,
        name: action.payload.name
      }
    case "FETCH_ARTICLES":
      return {
        ...state,
        articles: action.payload,
        dashboard_message: ''
      }
    case "DASHBOARD_MESSAGE":
      return {
        ...state,
        dashboard_message: action.payload
      }
    case "FORM_MESSAGE":
      return {
        ...state,
        form_message: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
