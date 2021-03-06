import initialState from '../stores/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: true,
        name: action.payload.name
      }
    default:
      return state
  }
}

export default rootReducer
