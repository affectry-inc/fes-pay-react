import * as Types from '../types/app'

const initState = {
  alertOpen: false,
  alertMessage: '',
  loginOpen: false,
  bandId: '',
  bandIds: [],
  uid: '',
  isAnonymous: false,
}

// reserve nice login!!
// const addItem = (array, item) => {
//   return Array.from(new Set([...array, item]))
// }

const app = (state = initState, action) => {
  switch (action.type) {
    case Types.OPEN_ALERT:
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: action.alertMessage,
      })
    case Types.CLOSE_ALERT:
      return Object.assign({}, state, {
        alertOpen: false,
      })
    case Types.OPEN_LOGIN:
      return Object.assign({}, state, {
        loginOpen: true,
      })
    case Types.CLOSE_LOGIN:
      return Object.assign({}, state, {
        loginOpen: false,
      })
    case Types.SET_BAND_ID:
      return Object.assign({}, state, {
        bandId: action.bandId,
      })
    case Types.SET_UID:
      return Object.assign({}, state, {
        uid: action.uid,
        isAnonymous: action.isAnonymous,
      })
    case Types.BAND_ID_ADDED:
      return Object.assign({}, state, {
        bandIds: action.bandIds,
      })
    case Types.CHANGE_BAND_ID:
      return Object.assign({}, state, {
        bandId: action.bandId,
      })
    case Types.LOGGED_OUT:
    default:
      return state
  }
}

export default app
