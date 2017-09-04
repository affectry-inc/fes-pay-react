import firebase from 'firebase'
import { firebaseDb, firebaseAuth } from '../firebase/'

const activateBand = (bandId, uid, cbSuccess, cbError) => {
  let updates= {}
  updates['/bands/' + bandId + '/anonymousBy'] = null
  updates['/bands/' + bandId + '/anonymousByUnix'] = null
  updates['/bands/' + bandId + '/isActive'] = true
  updates['/bands/' + bandId + '/uid'] = uid
  updates['/users/' + uid + '/' + bandId] = true

  firebaseDb.ref().update(updates)
  .then(() => {
    cbSuccess()
  })
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
    updates['/bands/' + bandId + '/uid'] = user.uid
    updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by
    updates['/bands/' + bandId + '/anonymousByUnix'] = anonymous_by.getTime()

    firebaseDb.ref().update(updates)
    .then(() => {
      cbSuccess()
    })
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

const skipCreditCard = (bandId, cbSuccess, cbError) => {
  firebaseAuth.signInAnonymously()
  .then(user => {
    let anonymous_by = new Date()
    anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

    let updates= {}
    updates['/bands/' + bandId + '/cardToken'] = null
    updates['/bands/' + bandId + '/cardLastDigits'] = null
    updates['/bands/' + bandId + '/cardCustomerId'] = null
    updates['/bands/' + bandId + '/uid'] = user.uid
    updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by
    updates['/bands/' + bandId + '/anonymousByUnix'] = anonymous_by.getTime()

    firebaseDb.ref().update(updates)
    .then(() => {
      cbSuccess()
    })
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
  .then(() => {
    cbSuccess()
  })
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
  .then(() => {
    cbSuccess()
  })
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const checkReadyToRegister = (bandId, onResetCredit, onResetFacePhoto, onReady) => {
  firebaseDb.ref('bands/' + bandId).once('value').then(function(snapshot) {
    const cardCustomerId = snapshot.val().cardCustomerId
    const photoUrl = snapshot.val().photoUrl
    if (!cardCustomerId) {
      console.log('cardCustomerId is missed')
      onResetCredit()
    } else if (!photoUrl) {
      console.log('photoUrl is missed')
      onResetFacePhoto()
    } else {
      onReady()
    }
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

const confirmSignIn = (bandId, verificationId, confirmCode, cbSuccess, cbError) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, confirmCode)
  firebase.auth().currentUser.linkWithCredential(credential)
  .then(user => {
    console.log('Anonymous account successfully upgraded', user)
    activateBand(bandId, user.uid,
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
        activateBand(bandId, user.uid,
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

const routeHome = (bandId, toHistory, toHowTo, callback) => {
  firebaseDb.ref('bands/' + bandId).once('value').then(function(snapshot) {
    firebaseAuth.onAuthStateChanged((user) => {
      const now = (new Date()).getTime()
      if (!snapshot.exists() ||
        (user && snapshot.val().uid === user.uid && !snapshot.val().isActive) ||
        (snapshot.val().anonymousByUnix && snapshot.val().anonymousByUnix < now)) {
        // route To SignUp
      } else if (user && snapshot.val().uid === user.uid && snapshot.val().isActive) {
        toHistory()
      } else {
        toHowTo()
      }
      callback()
    })
  })
  .catch(err => {
    console.log(err)
    toHowTo()
    callback()
  })
}

const listenBandIds = (uid, onAdd) => {
  const bandIdsRef = firebaseDb.ref('users/' + uid)
  bandIdsRef.on('value', function(snapshot) {
    let bandIds = []
    snapshot.forEach(function(childSnapshot){
      bandIds.push(childSnapshot.key)
    })
    onAdd(bandIds)
  })
}

module.exports = {
  saveCardToken,
  skipCreditCard,
  savePerson,
  savePhoneNumber,
  checkReadyToRegister,
  createRecaptchaVerifier,
  signInWithPhoneNumber,
  confirmSignIn,
  routeHome,
  listenBandIds,
}
