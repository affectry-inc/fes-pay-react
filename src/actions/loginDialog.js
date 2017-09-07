import { browserHistory } from 'react-router'

import FirebaseClient from '../utils/firebaseClient'
import * as Types from '../types/loginDialog'
import { OPEN_ALERT } from '../types/app'

import I18n from '../utils/i18n'

function changePhoneNumber(phoneNumber) {
  return (dispatch, getState) => {
    let errorText = ''

    if (!/^\d*$/.test(phoneNumber)) { errorText = I18n.t(getState().intl, 'loginDialog.invalidChars') }

    dispatch({
      type: Types.CHANGE_PHONE_NUMBER,
      phoneNumber: phoneNumber,
      phoneErrorText: errorText,
    })
  }
}

function changeConfirmCode(confirmCode) {
  return (dispatch, getState) => {
    dispatch({
      type: Types.CHANGE_CONFIRM_CODE,
      confirmCode: confirmCode,
    })
  }
}

function sendPhoneNumber(phoneNumber, recaptchaVerifier) {
  return dispatch => {
    const fullPhoneNumber = '+81' + phoneNumber.replace(/^0/,'')
    FirebaseClient.signInWithPhoneNumber(fullPhoneNumber, recaptchaVerifier,
      confirmationResult => {
        dispatch({
          type: Types.PHONE_NUMBER_SENT,
          verificationId: confirmationResult.verificationId
        })
      },
      err => {
        dispatch({
          type: Types.SIGNIN_ERROR,
        })
      }
    )
  }
}

function sendConfirmCode(confirmCode) {
  return (dispatch, getState) => {
    dispatch({ type: Types.DISP_LOADER })
    FirebaseClient.confirmWithCredential(getState().loginDialog.verificationId, confirmCode,
      user => {
        dispatch({
          type: Types.SEND_CONFIRM_CODE,
        })
      },
      err => {
        dispatch({
          type: Types.SIGNIN_ERROR,
        })
      }
    )
  }
}

function goBack() {
  return {
    type: Types.GO_BACK,
  }
}

function goCancel() {
  return (dispatch, getState) => {
    dispatch({
      type: Types.GO_CANCEL,
    })
    dispatch({
      type: OPEN_ALERT,
      alertMessage: I18n.t(getState().intl, 'loginDialog.noPrivilege')
    })
    browserHistory.push('/')
  }
}

module.exports = {
  changePhoneNumber,
  changeConfirmCode,
  sendPhoneNumber,
  sendConfirmCode,
  goBack,
  goCancel,
}
