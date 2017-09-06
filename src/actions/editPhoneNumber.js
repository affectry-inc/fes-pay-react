import * as Types from '../types/editPhoneNumber'

import I18n from '../utils/i18n'

const changePhoneNumber = (phoneNumber) => {
  return (dispatch, getState) => {
    let errorText = ''

    if (!/^\d*$/.test(phoneNumber)){ errorText=I18n.t(getState().intl, 'editPhoneNumber.invalidChars') }

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
