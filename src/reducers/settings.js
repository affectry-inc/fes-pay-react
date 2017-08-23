const initState = {
  couponBalance: '',
  dispCardNo: '',
  dispPhotoUrl: '',
  dispPhoneNumber: '',
}

function settings(state = initState, action){
   switch (action.type) {
    case 'SETTINGS_RECEIVE_DATA':
      return Object.assign({}, state, {
        dispCardNo: action.dispCardNo,
        dispPhotoUrl: action.dispPhotoUrl,
        dispPhoneNumber: action.dispPhoneNumber,
      })
    case 'COUPON_RECEIVE_DATA':
      return Object.assign({}, state, {
        couponBalance: action.couponBalance,
      })
    case 'SETTINGS_RECEIVE_ERROR':
    case 'COUPON_RECEIVE_ERROR':
    default:
      return state
  }
}

export default settings
