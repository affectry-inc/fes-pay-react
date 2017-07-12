import firebase from 'firebase'
import { firebaseDb, firebaseAuth } from '../firebase/'

const saveCardToken = (bandId, token, cbSuccess, cbError) => {
  firebaseAuth.signInAnonymously()
  .catch(err => {
    console.log(err)
    cbError()
  })

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      let anonymous_by = new Date()
      anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

      let updates= {}
      updates['/bands/' + bandId + '/cardToken'] = token
      updates['/bands/' + bandId + '/anonymousUid'] = user.uid
      updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by

      firebaseDb.ref().update(updates)
      .then(
        cbSuccess()
      )
      .catch(err => {
        console.log(err)
        cbError()
      })
    } else {
      cbError()
    }
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

const savePhoneNumber = (bandId, phoneNumber, cbSuccess, cbError) => {
  let updates= {}
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
    cbSuccess(user)
  })
  .catch(err => {
    if (err.code === 'auth/credential-already-in-use') {
      firebaseAuth.signInWithCredential(err.credential)
      .then(user => {
        console.log('Sign in with credential successfully', user)
        cbSuccess(user)
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
