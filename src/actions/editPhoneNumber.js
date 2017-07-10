import * as Types from '../types/editPhoneNumber'

const changePhoneNumber = (phoneNumber) => {
  return dispatch => {
    let errorText = ''

    if (!/^\d*$/.test(phoneNumber)){ errorText='不正な文字が含まれています' }

    dispatch({
      type: Types.CHANGE_PHONE_NUMBER,
      phoneNumber: phoneNumber,
      phoneNumberErrorText: errorText,
    })
  }
}

const checkTermsAgreed = (isTermsAgreed) => {
  return {
    type: Types.CHECK_TERMS_AGREED,
    isTermsAgreed: isTermsAgreed,
  }
}

module.exports = {
  changePhoneNumber,
  checkTermsAgreed,
}
