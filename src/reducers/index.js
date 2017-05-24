import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import todos from './todos'
import signUp from './signUp'

export default combineReducers({
  todos,
  signUp,
  routing: routerReducer
})
