import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import todos from './todos'
import app from './app'
import signUp from './signUp'
import editCreditCard from './editCreditCard'
import editFacePhoto from './editFacePhoto'
import editPhoneNumber from './editPhoneNumber'
import { intlReducer } from 'react-intl-redux'

export default combineReducers({
  todos,
  app,
  signUp,
  editCreditCard,
  editFacePhoto,
  editPhoneNumber,
  routing: routerReducer,
  intl: intlReducer,
})
