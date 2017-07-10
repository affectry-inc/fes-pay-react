import * as Types from '../types/editPhoneNumber'

const initState = {
  phoneNumber: '',
  phoneNumberErrorText: '',
  isTermsAgreed: false,
}

const editPhoneNumber = (state = initState, action) => {
  switch (action.type) {
    case Types.CHANGE_PHONE_NUMBER:
      return Object.assign({}, state, {
        phoneNumber: action.phoneNumber,
        phoneNumberErrorText: action.phoneNumberErrorText,
      })
    case Types.CHECK_TERMS_AGREED:
      return Object.assign({}, state, {
        isTermsAgreed: action.isTermsAgreed,
      })
    default:
      return state
  }
}

export default editPhoneNumber
