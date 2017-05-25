import {firebaseDb} from '../firebase/'
const ref = firebaseDb.ref('faces');

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

const saveFacePhoto = (photoUrl) => {
  return dispatch => {
    // TODO: save face
    console.log(photoUrl)
    dispatch({
      type: 'SAVE_FACE_PHOTO',
      dispPhotoUrl: photoUrl,
    })
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

const addFace = (photoUrl) => {
  return dispatch => {
    ref.push({
      photoUrl: photoUrl,
    })
    .catch(error => dispatch({
      type: 'ADD_FACE_ERROR',
      message: error.message,
    }))
  }
}

module.exports = {
  saveCreditCard,
  saveFacePhoto,
  resetCreditCard,
  resetFacePhoto,
  addFace,
}
