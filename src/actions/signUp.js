import AzureClient from '../utils/azureClient'
import FirebaseClient from '../utils/firebaseClient'

const saveCreditCard = (bandId, card) => {
  return dispatch => {
    console.log(card)
    // TODO: get token
    const token = 'TOKEN'
    FirebaseClient.saveCardToken(bandId, token,
      () => {
        dispatch({
          type: 'SAVE_CREDIT_CARD',
          dispCardNo: 'XXXX - XXXX - XXXX - ' + card.cardNo.slice(-4),
        })
      },
      err => {
        // TODO: Handle error
        dispatch({
          type: 'SAVE_CREDIT_CARD_ERROR',
        })
      }
    )
  }
}

const saveFacePhoto = (bandId, photoUrl) => {
  return dispatch => {
    AzureClient.registerPerson(bandId, photoUrl,
      (personId, persistedFaceId) => {
        FirebaseClient.savePerson(bandId, personId, persistedFaceId, photoUrl,
          () => {
            dispatch({
              type: 'SAVE_FACE_PHOTO',
              dispPhotoUrl: photoUrl,
            })
          },
          err => {
            dispatch({
              type: 'SAVE_FACE_PHOTO_ERROR',
              message: err.message,
            })
          }
        )
      },
      err => {
        dispatch({
          type: 'SAVE_FACE_PHOTO_ERROR',
          message: err.message,
        })
      }
    )
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
