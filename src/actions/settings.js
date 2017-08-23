import { firebaseDb } from '../firebase/'

// Subscribe
function loadSettings(bandId) {
  return dispatch => {
    const ref = firebaseDb.ref('bands/' + bandId)
    ref.once('value')
    .then(snapshot => {
      dispatch({
        type: 'SETTINGS_RECEIVE_DATA',
        dispCardNo: 'XXXX - XXXX - XXXX - ' + snapshot.child('cardLastDigits').val(),
        dispPhotoUrl: snapshot.child('photoUrl').val(),
        dispPhoneNumber: snapshot.child('phoneNumber').val(),
      })
    })
    .catch(error => {dispatch(loadSettingsError(error))})

    firebaseDb.ref('coupons/' + bandId).once('value')
    .then(snapshot => {
      let balance
      if (snapshot.exists()) {
        balance = snapshot.child('amount').val() - snapshot.child('amountUsed').val()
      }
      dispatch({
        type: 'COUPON_RECEIVE_DATA',
        couponBalance: balance,
      })
    })
    .catch(error => {dispatch(loadCouponError(error))})
  }
}

function loadSettingsError(error){
  return {
    type: 'SETTINGS_RECEIVE_ERROR',
    message: error.message
  }
}

function loadCouponError(error){
  return {
    type: 'COUPON_RECEIVE_ERROR',
    message: error.message
  }
}

module.exports = {
  loadSettings,
}
