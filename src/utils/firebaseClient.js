import firebase from 'firebase'
import { firebaseDb, firebaseAuth } from '../firebase/'

const updateUid = (bandId, uid, cbSuccess, cbError) => {
  let updates= {}
  updates['/bands/' + bandId + '/anonymousBy'] = null
  updates['/bands/' + bandId + '/anonymousByUnix'] = null

  firebaseDb.ref().update(updates)
  .then(
    cbSuccess()
  )
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const saveCardToken = (bandId, token, lastDigits, cbSuccess, cbError) => {
  firebaseAuth.signInAnonymously()
  .then(user => {
    let anonymous_by = new Date()
    anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

    let updates= {}
    updates['/bands/' + bandId + '/cardToken'] = token
    updates['/bands/' + bandId + '/cardLastDigits'] = lastDigits
    updates['/bands/' + bandId + '/cardCustomerId'] = null
    updates['/bands/' + bandId + '/cardId'] = null
    updates['/bands/' + bandId + '/uid'] = user.uid
    updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by
    updates['/bands/' + bandId + '/anonymousByUnix'] = anonymous_by.getTime()

    firebaseDb.ref().update(updates)
    .then(
      user.updateProfile({
        displayName: bandId,
      })
      .then(() => {
        cbSuccess()
      })
      .catch(err => {
        console.log(err)
        cbError(err)
      })
    )
    .catch(err => {
      console.log(err)
      cbError(err)
    })
  })
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const savePerson = (bandId, personId, persistedFaceId, photoUrl, cbSuccess, cbError) => {
  let persistedFace = {
    'photoUrl': photoUrl,
    'persons': {
      [personId]: true
    },
    'bands': {
      [bandId]: true
    }
  }

  let person = {
    'persistedFaces': {
      [persistedFaceId]: true
    },
    'bands': {
      [bandId]: true
    }
  }

  let updates= {}
  updates['/persistedFaces/' + persistedFaceId] = persistedFace
  updates['/persons/' + personId] = person
  updates['/bands/' + bandId + '/persons'] = { [personId]: true }
  updates['/bands/' + bandId + '/photoUrl'] = photoUrl

  firebaseDb.ref().update(updates)
  .then(
    cbSuccess()
  )
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const savePhoneNumber = (bandId, countryCode, phoneNumber, cbSuccess, cbError) => {
  let updates= {}
  updates['/bands/' + bandId + '/phoneCountryCode'] = countryCode
  updates['/bands/' + bandId + '/phoneNumber'] = phoneNumber

  firebaseDb.ref().update(updates)
  .then(
    cbSuccess()
  )
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const createRecaptchaVerifier = (elementId) => {
  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(elementId, {
    'size': 'invisible',
    'callback': (res) => {
      console.log(res)
    }
  })
  return recaptchaVerifier
}

const signInWithPhoneNumber = (phoneNumber, recaptchaVerifier, cbSuccess, cbError) => {
  firebaseAuth.signInWithPhoneNumber('+' + phoneNumber, recaptchaVerifier)
  .then(confirmationResult => {
    cbSuccess(confirmationResult)
  })
  .catch(err => {
    console.log('Error signing in with phone number', err)
    cbError(err)
  })
}

const confirmSignIn = (verificationId, confirmCode, cbSuccess, cbError) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, confirmCode)
  firebase.auth().currentUser.linkWithCredential(credential)
  .then(user => {
    console.log('Anonymous account successfully upgraded', user)
    updateUid(user.displayName, user.uid,
      () => {
        cbSuccess(user)
      },
      err => {
        cbError(err)
      }
    )
  })
  .catch(err => {
    if (err.code === 'auth/credential-already-in-use') {
      firebaseAuth.signInWithCredential(err.credential)
      .then(user => {
        console.log('Sign in with credential successfully', user)
        updateUid(user.displayName, user.uid,
          () => {
            cbSuccess(user)
          },
          err => {
            cbError(err)
          }
        )
      })
      .catch(err => {
        console.log('Error signing in with credential', err)
        cbError(err)
      })
    } else {
      console.log('Error upgrading anonymous account', err)
      cbError(err)
    }
  })
}

module.exports = {
  saveCardToken,
  savePerson,
  savePhoneNumber,
  createRecaptchaVerifier,
  signInWithPhoneNumber,
  confirmSignIn,
}
