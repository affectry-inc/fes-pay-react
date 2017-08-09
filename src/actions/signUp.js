import { browserHistory } from 'react-router'

import * as Types from '../types/signUp'
import { OPEN_ALERT } from '../types/app'
import I18n from '../utils/i18n'
import AzureClient from '../utils/azureClient'
import FirebaseClient from '../utils/firebaseClient'
import StripeClient from '../utils/stripeClient'

const saveCreditCard = (bandId, card) => {
  return (dispatch, getState) => {
    StripeClient.createToken(card,
      token => {
        const lastDigits = card.cardNo.slice(-4)
        FirebaseClient.saveCardToken(bandId, token, lastDigits,
          () => {
            dispatch({
              type: Types.SAVE_CREDIT_CARD,
              dispCardNo: 'XXXX - XXXX - XXXX - ' + lastDigits,
            })
          },
          err => {
            dispatch({
              type: OPEN_ALERT,
              alertMessage: I18n.t(getState().intl, 'signUp.saveCardError')
            })
          }
        )
      },
      err => {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'signUp.tokenizeError')
        })
      }
    )
  }
}

const saveFacePhoto = (bandId, photoUrl) => {
  return dispatch => {
    AzureClient.registerPerson(bandId, photoUrl,
      (personId, persistedFaceId) => {
        FirebaseClient.savePerson(bandId, personId, persistedFaceId, photoUrl,
          () => {
            dispatch({
              type: Types.SAVE_FACE_PHOTO,
              dispPhotoUrl: photoUrl,
            })
          },
          err => {
            dispatch({
              type: Types.SAVE_FACE_PHOTO_ERROR,
            })
          }
        )
      },
      err => {
        dispatch({
          type: Types.SAVE_FACE_PHOTO_ERROR,
        })
      }
    )
  }
}

const savePhoneNumber = (bandId, countryCode, phoneNumber, recaptchaVerifier) => {
  return dispatch => {
    const fullPhoneNumber = '+' + countryCode + phoneNumber.replace(/^0/,'')
    FirebaseClient.signInWithPhoneNumber(fullPhoneNumber, recaptchaVerifier,
      confirmationResult => {
        window.confirmationResult = confirmationResult
        FirebaseClient.savePhoneNumber(bandId, countryCode, phoneNumber,
          () => {
            dispatch({
              type: Types.SAVE_PHONE_NUMBER,
              dispPhoneNumber: phoneNumber,
            })
          },
          err => {
            dispatch({
              type: Types.SAVE_PHONE_NUMBER_ERROR,
            })
          }
        )
      },
      err => {
        dispatch({
          type: Types.SAVE_PHONE_NUMBER_ERROR,
        })
      }
    )
  }
}

const sendConfirmCode = (confirmCode) => {
  return dispatch => {
    FirebaseClient.confirmSignIn(window.confirmationResult.verificationId, confirmCode,
      user => {
        browserHistory.push('/')
        dispatch({
          type: Types.SEND_CONFIRM_CODE,
        })
      },
      err => {
        dispatch({
          type: Types.SEND_CONFIRM_CODE_ERROR,
        })
      }
    )
  }
}

const resetCreditCard = () => {
  return {
    type: Types.RESET_CREDIT_CARD,
  }
}

const resetFacePhoto = () => {
  return {
    type: Types.RESET_FACE_PHOTO,
  }
}

const resetPhoneNumber = () => {
  return {
    type: Types.RESET_PHONE_NUMBER,
  }
}

module.exports = {
  saveCreditCard,
  saveFacePhoto,
  savePhoneNumber,
  sendConfirmCode,
  resetCreditCard,
  resetFacePhoto,
  resetPhoneNumber,
}
