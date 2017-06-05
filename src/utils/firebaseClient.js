import {firebaseDb} from '../firebase/'

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

  firebaseDb.ref().update(updates)
  .then(
    cbSuccess()
  )
  .catch(err =>
    cbError(err)
  )
}

module.exports = {
  savePerson,
}
