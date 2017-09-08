import * as Types from '../types/settings'

const initState = {
  isPrivileged: false,
  isReset: false,
  couponBalance: '',
  dispCardNo: '',
  dispPhotoUrl: '',
  dispPhoneNumber: '',
  isLoading: false,
  openResetDialog: false,
}

function settings(state = initState, action){
  switch (action.type) {
    case Types.DISP_LOADER:
      return Object.assign({}, state, {
        isLoading: true,
      })

    case Types.OPEN_RESET_DIALOG:
      return Object.assign({}, state, {
        openResetDialog: true,
      })

    case Types.CLOSE_RESET_DIALOG:
      return Object.assign({}, state, {
        openResetDialog: false,
      })

    case Types.RESET_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        isReset: true,
        couponBalance: '',
        dispCardNo: '',
        dispPhotoUrl: '',
        isLoading: false,
        openResetDialog: false,
      })

    case Types.RESET_SETTINGS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        openResetDialog: false,
      })

    case Types.SETTINGS_RECEIVE_DATA:
      return Object.assign({}, state, {
        isPrivileged: true,
        isReset: action.isReset,
        dispCardNo: action.dispCardNo,
        dispPhotoUrl: action.dispPhotoUrl,
        dispPhoneNumber: action.dispPhoneNumber,
        isLoading: false,
      })
    case Types.COUPON_RECEIVE_DATA:
      return Object.assign({}, state, {
        couponBalance: action.couponBalance,
      })
    case Types.SETTINGS_RECEIVE_ERROR:
    case Types.COUPON_RECEIVE_ERROR:
    case Types.NO_PRIVILEGE:
      return Object.assign({}, state, initState)

    default:
      return state
  }
}

export default settings
