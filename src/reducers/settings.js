import * as Types from '../types/settings'

const initState = {
  isPrivileged: false,
  couponBalance: '',
  dispCardNo: '',
  dispPhotoUrl: '',
  dispPhoneNumber: '',
}

function settings(state = initState, action){
   switch (action.type) {
    case Types.SETTINGS_RECEIVE_DATA:
      return Object.assign({}, state, {
        isPrivileged: true,
        dispCardNo: action.dispCardNo,
        dispPhotoUrl: action.dispPhotoUrl,
        dispPhoneNumber: action.dispPhoneNumber,
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
