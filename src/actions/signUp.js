import {firebaseDb} from '../firebase/'

const refFaces = firebaseDb.ref('faces')

const saveCreditCard = (card) => {
  return dispatch => {
    // TODO: save & register card
    console.log(card)
    dispatch({
      type: 'SAVE_CREDIT_CARD',
      dispCardNo: '****-****-****-' + card.cardNo.slice(-4),
    })
  }
}

const saveFacePhoto = (bandId, photoUrl) => {
  return dispatch => {
    // TODO: save photo
    const faceId = refFaces.push().key

    let updates= {}
    updates['/faces/' + faceId + '/photoUrl'] = photoUrl
    updates['/faces/' + faceId + '/bands/' + bandId] = true
    updates['/bands/' + bandId + '/faces/' + faceId] = true

    firebaseDb.ref().update(updates)
    .then(dispatch({
      type: 'SAVE_FACE_PHOTO',
      dispPhotoUrl: photoUrl,
    }))
    .catch(error => dispatch({
      type: 'SAVE_FACE_PHOTO_ERROR',
      message: error.message,
    }))
  }
}

const resetCreditCard = () => {
  return {
    type: 'RESET_CREDIT_CARD',
  }
}

const resetFacePhoto = () => {
  return {
    type: 'RESET_FACE_PHOTO',
  }
}

module.exports = {
  saveCreditCard,
  saveFacePhoto,
  resetCreditCard,
  resetFacePhoto,
}
