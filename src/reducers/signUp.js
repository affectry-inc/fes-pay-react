import * as Types from '../types/signUp'

const initState = {
  stepIndex: 0,
  dispCardNo: '',
  dispPhotoUrl: '',
  dispPhoneNumber: '',
  confirmCodeDialogOpen: false,
  isLoadingCard: false,
  isLoadingPhoto: false,
  isLoadingPhone: false,
  isLoadingConfCode: false,
  isNew: false,
}

const signUp = (state = initState, action) => {
  switch (action.type) {
    case Types.SAVE_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispCardNo: action.dispCardNo,
        isLoadingCard: false,
      })
    case Types.SKIP_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispCardNo: action.dispCardNo,
      })
    case Types.SAVE_FACE_PHOTO:
      return Object.assign({}, state, {
        stepIndex: 2,
        dispPhotoUrl: action.dispPhotoUrl,
        isLoadingPhoto: false,
      })
    case Types.SAVE_PHONE_NUMBER:
      return Object.assign({}, state, {
        stepIndex: 3,
        dispPhoneNumber: action.dispPhoneNumber,
        confirmCodeDialogOpen: true,
        isLoadingPhone: false,
      })
    case Types.SEND_CONFIRM_CODE:
      return Object.assign({}, state, {
        confirmCodeDialogOpen: false,
        isLoadingConfCode: false,
        isNew: true,
      })
    case Types.RESET_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 0,
        dispCardNo: '',
        isLoadingPhone: false,
      })
    case Types.RESET_FACE_PHOTO:
      return Object.assign({}, state, {
        stepIndex: 1,
        dispPhotoUrl: '',
        isLoadingPhone: false,
      })
    case Types.BACK_TO_CREDIT_CARD:
      return Object.assign({}, state, {
        stepIndex: 0,
      })
    case Types.BACK_TO_FACE_PHOTO:
      return Object.assign({}, state, {
        stepIndex: 1,
      })
    case Types.BACK_TO_PHONE_NUMBER:
      return Object.assign({}, state, {
        stepIndex: 2,
        confirmCodeDialogOpen: false,
      })
    case Types.SAVE_FACE_PHOTO_ERROR:
      return Object.assign({}, state, {
        isLoadingPhoto: false,
      })
    case Types.SAVE_PHONE_NUMBER_ERROR:
      return Object.assign({}, state, {
        isLoadingPhone: false,
      })
    case Types.SEND_CONFIRM_CODE_ERROR:
      return Object.assign({}, state, {
        stepIndex: 2,
        confirmCodeDialogOpen: false,
        isLoadingConfCode: false,
      })
    case Types.DISP_CARD_LOADER:
      return Object.assign({}, state, {
        isLoadingCard: true,
      })
    case Types.HIDE_CARD_LOADER:
      return Object.assign({}, state, {
        isLoadingCard: false,
      })
    case Types.DISP_PHOTO_LOADER:
      return Object.assign({}, state, {
        isLoadingPhoto: true,
      })
    case Types.HIDE_PHOTO_LOADER:
      return Object.assign({}, state, {
        isLoadingPhoto: false,
      })
    case Types.DISP_PHONE_LOADER:
      return Object.assign({}, state, {
        isLoadingPhone: true,
      })
    case Types.DISP_CONF_CODE_LOADER:
      return Object.assign({}, state, {
        isLoadingConfCode: true,
      })
    case Types.CLEAR:
      return Object.assign({}, state, initState)
    default:
      return state
  }
}

export default signUp
