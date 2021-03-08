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
        dashboardMessage: ''
      }
    case "SUCCESS_MESSAGE":
      return {
        ...state,
        successMessage: action.payload
      }
    case "DASHBOARD_MESSAGE":
      return {
        ...state,
        dashboardMessage: action.payload
      }
    case "FORM_MESSAGE":
      return {
        ...state,
        formMessage: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
