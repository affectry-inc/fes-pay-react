import { firebaseDb, firebaseAuth } from '../firebase/'

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
  .catch(err =>
    cbError(err)
  )
}

const saveCardToken = (bandId, token, cbSuccess, cbError) => {
  firebaseAuth.signInAnonymously()
  .catch(err =>
    cbError(err)
  )

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      let anonymous_by = new Date()
      anonymous_by.setMinutes(anonymous_by.getMinutes() + 30)

      let updates= {}
      updates['/bands/' + bandId + '/cardToken'] = token
      updates['/bands/' + bandId + '/anonymous_uid'] = user.uid
      updates['/bands/' + bandId + '/anonymous_by'] = anonymous_by

      firebaseDb.ref().update(updates)
      .then(
        cbSuccess()
      )
      .catch(err =>
        cbError(err)
      )
    } else {
      cbError()
    }
  })
}

module.exports = {
  savePerson,
  saveCardToken,
}
