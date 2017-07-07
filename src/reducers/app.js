import { OPEN_ALERT, CLOSE_ALERT } from '../types/app'

const initState = {
  alertOpen: false,
  alertMessage: '',
}

const app = (state = initState, action) => {
  switch (action.type) {
    case OPEN_ALERT:
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: action.alertMessage,
      })
    case CLOSE_ALERT:
      return Object.assign({}, state, {
        alertOpen: false,
      })
    default:
      return state
  }
}

export default app
