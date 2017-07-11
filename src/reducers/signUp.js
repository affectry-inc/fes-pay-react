import * as Types from '../types/signUp'

const initState = {
  stepIndex: 0,
  dispCardNo: '',
  dispPhotoUrl: '',
  confirmCodeDialogOpen: false,
}

const signUp = (state = initState, action) => {
  switch (action.type) {
    case Types.SAVE_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispCardNo: action.dispCardNo,
      })
    case Types.SAVE_FACE_PHOTO:
      return Object.assign({}, state, {
        stepIndex: 2,
        dispPhotoUrl: action.dispPhotoUrl,
      })
    case Types.SAVE_PHONE_NUMBER:
      return Object.assign({}, state, {
        confirmCodeDialogOpen: true,
      })
    case Types.SEND_CONFIRM_CODE:
      return Object.assign({}, state, {
        confirmCodeDialogOpen: false,
      })
    case Types.RESET_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 0,
        dispCardNo: '',
      })
    case Types.RESET_FACE_PHOTO:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispPhotoUrl: '',
      })
    case Types.SAVE_CREDIT_CARD_ERROR:
      return Object.assign({}, state, {
      })
    case Types.SAVE_FACE_PHOTO_ERROR:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispPhotoUrl: '',
      })
    case Types.SAVE_PHONE_NUMBER_ERROR:
      return Object.assign({}, state, {
      })
    case Types.SEND_CONFIRM_CODE_ERROR:
      return Object.assign({}, state, {
        confirmCodeDialogOpen: false,
      })
    default:
      return state
  }
}

export default signUp
