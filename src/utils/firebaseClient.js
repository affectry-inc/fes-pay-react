import firebase from 'firebase'
import { firebaseDb, firebaseAuth } from '../firebase/'

const fullPhoneNumber = (countryCode, phoneNumber) => {
  return '+' + countryCode + phoneNumber.replace(/^0/, '')
}

const activateBand = (bandId, uid, cbSuccess, cbError) => {
  let updates= {}
  updates['/bands/' + bandId + '/anonymousBy'] = null
  updates['/bands/' + bandId + '/anonymousByUnix'] = null
  updates['/bands/' + bandId + '/isActive'] = true
  updates['/bands/' + bandId + '/isReset'] = null
  updates['/bands/' + bandId + '/uid'] = uid

  firebaseDb.ref().update(updates)
  .then(() => {
    cbSuccess()

    firebaseDb.ref('bands/'+ bandId).once('value')
    .then(snapshot => {
      firebaseDb.ref('users/' + uid + '/' + bandId).set({
        cardLastDigits: snapshot.child('cardLastDigits').val(),
        photoUrl: snapshot.child('photoUrl').val()
      })
    })
    .catch(err => {})
  })
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const execSaveCardToken = (uid, bandId, token, lastDigits, isReset, cbSuccess, cbError) => {
  let anonymous_by = new Date()
  anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

  let updates= {}
  updates['/bands/' + bandId + '/cardToken'] = token
  updates['/bands/' + bandId + '/cardLastDigits'] = lastDigits
  updates['/bands/' + bandId + '/cardCustomerId'] = null
  updates['/bands/' + bandId + '/uid'] = uid
  if (!isReset) {
    updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by
    updates['/bands/' + bandId + '/anonymousByUnix'] = anonymous_by.getTime()
  }

  firebaseDb.ref().update(updates)
  .then(() => {
    cbSuccess()
  })
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const saveCardToken = (uid, bandId, token, lastDigits, cbSuccess, cbError) => {
  if (uid) {
    firebaseDb.ref('bands/' + bandId).once('value')
    .then(snapshot => {
      let isReset = snapshot.child('isReset').val()
      execSaveCardToken(uid, bandId, token, lastDigits, isReset, cbSuccess, cbError)
    })
    .catch(err => {
      console.log(err)
      cbError(err)
    })
  } else {
    firebaseAuth.signInAnonymously()
    .then(anoUser => {
      execSaveCardToken(anoUser.uid, bandId, token, lastDigits, false, cbSuccess, cbError)
    })
    .catch(err => {
      console.log(err)
      cbError(err)
    })
  }
}

const skipCreditCard = (bandId, cbSuccess, cbError) => {
  cbError()
  // firebaseAuth.signInAnonymously()
  // .then(user => {
  //   let anonymous_by = new Date()
  //   anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

  //   let updates= {}
  //   updates['/bands/' + bandId + '/cardToken'] = null
  //   updates['/bands/' + bandId + '/cardLastDigits'] = null
  //   updates['/bands/' + bandId + '/cardCustomerId'] = null
  //   updates['/bands/' + bandId + '/uid'] = user.uid
  //   updates['/bands/' + bandId + '/anonymousBy'] = anonymous_by
  //   updates['/bands/' + bandId + '/anonymousByUnix'] = anonymous_by.getTime()

  //   firebaseDb.ref().update(updates)
  //   .then(() => {
  //     cbSuccess()
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     cbError(err)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   cbError(err)
  // })
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
  updates['/bands/' + bandId + '/fullPhoneNumber'] = fullPhoneNumber(countryCode, phoneNumber)

  firebaseDb.ref().update(updates)
  .then(() => {
    cbSuccess()
  })
  .catch(err => {
    console.log(err)
    cbError(err)
  })
}

const checkReadyToRegister = (bandId, onResetCredit, onResetFacePhoto, onReady, onError) => {
  firebaseDb.ref('bands/' + bandId).once('value')
  .then(snapshot => {
    if (!snapshot.exists()) {
      console.log('no band info')
      onResetCredit()
      return
    }
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
  .catch(err =>{
    console.log(err)
    onError(err)
  })
}

const createRecaptchaVerifier = (elementId) => {
  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(elementId, {
    'size': 'invisible',
    'callback': (res) => {
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

const confirmWithCredential = (verificationId, code, cbSuccess, cbError) => {
  let credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
  firebaseAuth.signInWithCredential(credential)
  .then(user => {
    cbSuccess(user)
  })
  .catch(err => {
    console.log('Error signing in with credential', err)
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
    } else if (err.code === 'auth/provider-already-linked') {
      confirmWithCredential(verificationId, confirmCode,
        user => {
          activateBand(bandId, user.uid,
            () => {
              cbSuccess(user)
            },
            err => {
              cbError(err)
            }
          )
        },
        err => {
          cbError(err)
        }
      )
    } else {
      console.log('Error upgrading anonymous account', err)
      cbError(err)
    }
  })
}

const routeHome = (bandId, replace, callback) => {
  firebaseDb.ref('bands/' + bandId).once('value').then(function(snapshot) {
    firebaseAuth.onAuthStateChanged((user) => {
      const now = (new Date()).getTime()
      if (!snapshot.exists() ||
        (user && snapshot.val().uid === user.uid && !snapshot.val().isActive && !snapshot.val().isReset) ||
        (snapshot.val().anonymousByUnix && snapshot.val().anonymousByUnix < now)) {
        // route To SignUp
      } else {
        replace({pathname: '/history/' + bandId})
      }
      callback()
    })
  })
  .catch(err => {
    console.log(err)
    replace({pathname: '/history/' + bandId})
    callback()
  })
}

const listenBandIds = (uid, onAdd) => {
  const bandIdsRef = firebaseDb.ref('users/' + uid)
  bandIdsRef.off()
  bandIdsRef.on('value', function(snapshot) {
    onAdd(snapshot.toJSON())
  })
}

const resetSettings = (bandId, cbSuccess, cbError) => {
  let updates= {}
  updates['/bands/' + bandId + '/anonymousBy'] = null
  updates['/bands/' + bandId + '/anonymousByUnix'] = null
  updates['/bands/' + bandId + '/isActive'] = null
  updates['/bands/' + bandId + '/cardToken'] = null
  updates['/bands/' + bandId + '/cardLastDigits'] = null
  updates['/bands/' + bandId + '/cardCustomerId'] = null
  updates['/bands/' + bandId + '/persons'] = null
  updates['/bands/' + bandId + '/photoUrl'] = null
  updates['/bands/' + bandId + '/isReset'] = true

  firebaseDb.ref().update(updates)
  .then(() => {
    cbSuccess()

    firebaseDb.ref('bands/'+ bandId).once('value')
    .then(snapshot => {
      const uid = snapshot.child('uid').val()
      firebaseDb.ref('users/' + uid + '/' + bandId).set({
        cardLastDigits: '----',
        photoUrl: null
      })
    })
    .catch(err => {})
  })
  .catch(err => {
    console.log(err)
    cbError(err)
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
  confirmWithCredential,
  confirmSignIn,
  routeHome,
  listenBandIds,
  resetSettings,
}
