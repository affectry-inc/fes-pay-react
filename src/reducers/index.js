import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import todos from './todos'
import signUp from './signUp'
import editFacePhoto from './editFacePhoto'
import editCreditCard from './editCreditCard'

export default combineReducers({
  todos,
  signUp,
  editFacePhoto,
  editCreditCard,
  routing: routerReducer
})
