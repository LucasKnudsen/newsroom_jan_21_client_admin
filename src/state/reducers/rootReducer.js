import initialState from '../stores/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: true,
        name: action.payload.name
      }
    case "CREATE_ARTICLE":
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
