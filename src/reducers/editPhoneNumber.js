import * as Types from '../types/editPhoneNumber'

const initState = {
  phoneNumber: '',
  phoneNumberErrorText: '',
  isTermsAgreed: false,
  canGoNext: false,
}

const attachCanGoNext = (state) => {
  const invalid = !state.phoneNumber || state.phoneNumber.length < 1 || state.phoneNumberErrorText || !state.isTermsAgreed

  state.canGoNext = !invalid

  return state
}

const editPhoneNumber = (state = initState, action) => {
  let obj
  switch (action.type) {
    case Types.CHANGE_PHONE_NUMBER:
      obj = Object.assign({}, state, {
        phoneNumber: action.phoneNumber,
        phoneNumberErrorText: action.phoneNumberErrorText,
      })
      return attachCanGoNext(obj)
    case Types.CHECK_TERMS_AGREED:
      obj = Object.assign({}, state, {
        isTermsAgreed: action.isTermsAgreed,
      })
      return attachCanGoNext(obj)
    default:
      return state
  }
}

export default editPhoneNumber
