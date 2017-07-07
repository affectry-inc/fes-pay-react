const initState = {
  alertOpen: false,
  alertMessage: '',
}

const app = (state = initState, action) => {
  switch (action.type) {
    case 'APP_OPEN_ALERT':
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: action.alertMessage,
      })
    case 'APP_CLOSE_ALERT':
      return Object.assign({}, state, {
        alertOpen: false,
      })
    default:
      return state
  }
}

export default app
