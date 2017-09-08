import { firebaseDb, firebaseAuth } from '../firebase/'
import * as Types from '../types/settings'
import { OPEN_ALERT } from '../types/app'
import FirebaseClient from '../utils/firebaseClient'
import I18n from '../utils/i18n'

// Subscribe
function loadSettings(bandId) {
  return dispatch => {
    dispatch({ type: Types.DISP_LOADER })
    const ref = firebaseDb.ref('bands/' + bandId)
    ref.once('value')
    .then(snapshot => {dispatch(loadSettingsSuccess(snapshot))})
    .catch(error => {dispatch(loadSettingsError(error))})

    // firebaseDb.ref('coupons/' + bandId).once('value')
    // .then(snapshot => {
    //   let balance
    //   if (snapshot.exists()) {
    //     balance = snapshot.child('amount').val() - snapshot.child('amountUsed').val()
    //   }
    //   dispatch({
    //     type: Types.COUPON_RECEIVE_DATA,
    //     couponBalance: balance,
    //   })
    // })
    // .catch(error => {dispatch(loadCouponError(error))})
  }
}

function loadSettingsSuccess(snapshot) {
  return {
    type: Types.SETTINGS_RECEIVE_DATA,
    isReset: snapshot.child('isReset').val(),
    dispCardNo: 'XXXX - XXXX - XXXX - ' + snapshot.child('cardLastDigits').val(),
    dispPhotoUrl: snapshot.child('photoUrl').val(),
    dispPhoneNumber: snapshot.child('phoneNumber').val(),
  }
}

function loadSettingsError(error){
  if (error.code === 'PERMISSION_DENIED') {
    return {
      type: Types.NO_PRIVILEGE,
    }
  } else {
    return {
      type: Types.SETTINGS_RECEIVE_ERROR,
      message: error.message
    }
  }
}

// function loadCouponError(error){
//   return {
//     type: Types.COUPON_RECEIVE_ERROR,
//     message: error.message
//   }
// }
//

function listenLogin(bandId) {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(loadSettings(bandId))
      } else {
        dispatch({ type: Types.NO_PRIVILEGE })
      }
    })
  }
}

function resetSettings(bandId) {
  return (dispatch, getState) => {
    dispatch({ type: Types.DISP_LOADER })
    FirebaseClient.resetSettings(bandId,
      () => {
        dispatch({
          type: Types.RESET_SETTINGS_SUCCESS,
        })
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'settings.resetSuccessfully')
        })
      },
      err => {
        dispatch({
          type: Types.RESET_SETTINGS_ERROR,
          message: err.message,
        })
        dispatch({
          type: OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'settings.resetFailed')
        })
      }
    )
  }
}

function openResetDialog() {
  return {
    type: Types.OPEN_RESET_DIALOG,
  }
}

function closeResetDialog() {
  return {
    type: Types.CLOSE_RESET_DIALOG,
  }
}

module.exports = {
  loadSettings,
  listenLogin,
  resetSettings,
  openResetDialog,
  closeResetDialog,
}
