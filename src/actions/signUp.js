import {firebaseDb} from '../firebase/'
const ref = firebaseDb.ref('faces');

const saveCreditCard = (card) => {
  return dispatch => {
    console.log(card)
    dispatch({
      type: 'GO_NEXT'
    })
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
    }));
  }
}

module.exports = {
  saveCreditCard,
  addFace,
}
