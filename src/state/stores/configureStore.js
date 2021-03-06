import initialState from './initialState'
import rootReducer from '../reducers/rootReducer'
import { createStore } from 'redux'

const store = createStore(rootReducer, initialState)

export default store
