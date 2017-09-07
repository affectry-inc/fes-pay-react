import * as Types from '../types/loginDialog'

const initState = {
  phoneNumber: '',
  phoneErrorText: '',
  confirmCode: '',
  step: 0,
  isFailed: false,
  isLoading: false,
  verificationId: '',
}

function loginDialog(state = initState, action){
  switch (action.type) {
    case Types.DISP_LOADER:
      return Object.assign({}, state, {
        isLoading: true,
      })

    case Types.CHANGE_PHONE_NUMBER:
      return Object.assign({}, state, {
        phoneNumber: action.phoneNumber,
      })

    case Types.CHANGE_CONFIRM_CODE:
      return Object.assign({}, state, {
        confirmCode: action.confirmCode,
      })

    case Types.PHONE_NUMBER_SENT:
      return Object.assign({}, state, {
        verificationId: action.verificationId,
        step: 1,
        isLoading: false
      })

    case Types.SEND_CONFIRM_CODE:
      return Object.assign({}, state, initState)

    case Types.SIGNIN_ERROR:
      return Object.assign({}, state, {
        phoneNumber: '',
        phoneErrorText: '',
        confirmCode: '',
        step: 0,
        isFailed: true,
        isLoading: false,
        verificationId: '',
      })

    case Types.GO_BACK:
      return Object.assign({}, state, initState)

    case Types.GO_CANCEL:
      return Object.assign({}, state, initState)

    default:
      return state
  }
}

export default loginDialog
