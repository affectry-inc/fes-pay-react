import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import todos from './todos'
import app from './app'
import signUp from './signUp'
import editCreditCard from './editCreditCard'
import editFacePhoto from './editFacePhoto'
import editPhoneNumber from './editPhoneNumber'
import history from './history'
import settings from './settings'
import { intlReducer } from 'react-intl-redux'

export default combineReducers({
  todos,
  app,
  signUp,
  editCreditCard,
  editFacePhoto,
  editPhoneNumber,
  history,
  settings,
  routing: routerReducer,
  intl: intlReducer,
})
