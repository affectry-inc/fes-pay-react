import * as Types from '../types/app'

const initState = {
  alertOpen: false,
  alertMessage: '',
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
    default:
      return state
  }
}

export default app
