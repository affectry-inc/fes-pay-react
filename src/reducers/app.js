import * as Types from '../types/app'

const initState = {
  alertOpen: false,
  alertMessage: '',
  bandId: '',
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
      })
    default:
      return state
  }
}

export default app
