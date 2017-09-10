import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import todos from './todos'
import app from './app'
import signUp from './signUp'
import reRegister from './reRegister'
import editCreditCard from './editCreditCard'
import editFacePhoto from './editFacePhoto'
import editPhoneNumber from './editPhoneNumber'
import history from './history'
import settings from './settings'
import loginDialog from './loginDialog'
import { intlReducer } from 'react-intl-redux'

export default combineReducers({
  todos,
  app,
  signUp,
  reRegister,
  editCreditCard,
  editFacePhoto,
  editPhoneNumber,
  history,
  settings,
  loginDialog,
  routing: routerReducer,
  intl: intlReducer,
})
