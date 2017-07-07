import * as Types from '../types/signUp'

import AzureClient from '../utils/azureClient'
import FirebaseClient from '../utils/firebaseClient'

const saveCreditCard = (bandId, card) => {
  return dispatch => {
    // TODO: get token
    const token = 'TOKEN'
    FirebaseClient.saveCardToken(bandId, token,
      () => {
        dispatch({
          type: Types.SAVE_CREDIT_CARD,
          dispCardNo: 'XXXX - XXXX - XXXX - ' + card.cardNo.slice(-4),
        })
      },
      err => {
        // TODO: Handle error
        dispatch({
          type: Types.SAVE_CREDIT_CARD_ERROR,
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
              type: Types.SAVE_FACE_PHOTO,
              dispPhotoUrl: photoUrl,
            })
          },
          err => {
            dispatch({
              type: Types.SAVE_FACE_PHOTO_ERROR,
              message: err.message,
            })
          }
        )
      },
      err => {
        dispatch({
          type: Types.SAVE_FACE_PHOTO_ERROR,
          message: err.message,
        })
      }
    )
  }
}

const resetCreditCard = () => {
  return {
    type: Types.RESET_CREDIT_CARD,
  }
}

const resetFacePhoto = () => {
  return {
    type: Types.RESET_FACE_PHOTO,
  }
}

module.exports = {
  saveCreditCard,
  saveFacePhoto,
  resetCreditCard,
  resetFacePhoto,
}
