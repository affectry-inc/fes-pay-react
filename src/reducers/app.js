import * as Types from '../types/app'

const initState = {
  alertOpen: false,
  alertMessage: '',
  bandId: '',
  bandIds: [],
  uid: '',
  isAnonymous: false,
}

const addItem = (array, item) => {
  return Array.from(new Set([...array, item]))
}

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
    case Types.SET_BAND_ID:
      return Object.assign({}, state, {
        bandId: action.bandId,
        bandIds: addItem(state.bandIds, action.bandId),
        uid: action.uid,
        isAnonymous: action.isAnonymous,
      })
    default:
      return state
  }
}

export default app
