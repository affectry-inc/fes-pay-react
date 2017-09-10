import { firebaseDb, firebaseAuth } from '../firebase/'
import * as Types from '../types/reRegister'

function listenLogin(bandId) {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const ref = firebaseDb.ref('bands/' + bandId)
        ref.once('value')
        .then(snapshot => {
          let isReset = snapshot.child('isReset').val() === true
          let isPriv = snapshot.child('uid').val() === user.uid
          if ( isReset && isPriv ) {
            dispatch({ type: Types.PRIVILEGED })
          } else {
            dispatch({ type: Types.NO_PRIVILEGE })
          }
        })
        .catch(error => {dispatch({ type: Types.NO_PRIVILEGE })})
      } else {
        dispatch({ type: Types.NO_PRIVILEGE })
      }
    })
  }
}

module.exports = {
  listenLogin,
}
