import { browserHistory } from 'react-router'

import * as Types from '../types/signUp'
import { OPEN_ALERT } from '../types/app'
import I18n from '../utils/i18n'
import AzureClient from '../utils/azureClient'
import FirebaseClient from '../utils/firebaseClient'
import StripeClient from '../utils/stripeClient'

const saveCreditCard = (bandId, card) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.DISP_CARD_LOADER })
    StripeClient.createToken(card,
      token => {
        const lastDigits = card.cardNo.slice(-4)
        FirebaseClient.saveCardToken(getState().app.uid, bandId, token, lastDigits,
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
            dispatch({ type: Types.HIDE_CARD_LOADER })
          }
        )
      },
      err => {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'signUp.tokenizeError')
        })
        dispatch({ type: Types.HIDE_CARD_LOADER })
      }
    )
  }
}

const skipCreditCard = (bandId) => {
  return (dispatch, getState) => {
    FirebaseClient.skipCreditCard(bandId,
      () => {
        dispatch({
          type: Types.SKIP_CREDIT_CARD,
          dispCardNo: I18n.t(getState().intl, 'signUp.noCardSaved'),
        })
      },
      err => {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'signUp.skipCardError')
        })
      }
    )
  }
}

const saveFacePhoto = (bandId, photoUrl) => {
  return dispatch => {
    dispatch({ type: Types.DISP_PHOTO_LOADER })
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

const savePhoneNumber = (dispatch, bandId, countryCode, phoneNumber, recaptchaVerifier) => {
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

const register = (bandId, countryCode, phoneNumber, recaptchaVerifier) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.DISP_PHONE_LOADER })
    FirebaseClient.checkReadyToRegister(bandId,
      () => {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'signUp.missingCreditCard')
        })
        dispatch({
          type: Types.RESET_CREDIT_CARD,
        })
      },
      () => {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'signUp.missingFacePhoto')
        })
        dispatch({
          type: Types.RESET_FACE_PHOTO,
        })
      },
      () => {
        savePhoneNumber(dispatch, bandId, countryCode, phoneNumber, recaptchaVerifier)
      }
    )
  }
}

const sendConfirmCode = (confirmCode, bandId) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.DISP_CONF_CODE_LOADER })
    const verificationId = window.confirmationResult.verificationId
    FirebaseClient.confirmSignIn(bandId, verificationId, confirmCode,
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

const backToCreditCard = () => {
  return {
    type: Types.BACK_TO_CREDIT_CARD,
  }
}

const backToFacePhoto = () => {
  return {
    type: Types.BACK_TO_FACE_PHOTO,
  }
}

const backToPhoneNumber = () => {
  return {
    type: Types.BACK_TO_PHONE_NUMBER,
  }
}

const clear = () => {
  return {
    type: Types.CLEAR
  }
}

module.exports = {
  saveCreditCard,
  skipCreditCard,
  saveFacePhoto,
  register,
  sendConfirmCode,
  backToCreditCard,
  backToFacePhoto,
  backToPhoneNumber,
  clear,
}
