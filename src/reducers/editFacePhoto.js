const initState = {
  photoUrl: '',
  photoAlt: '',
  croppedPhotoUrl: '',
  faces: [],
  scale: 0,
  canGoNext: false,
}

const editFacePhoto = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_PHOTO':
      return Object.assign({}, state, {
        photoUrl: action.photoUrl,
        photoAlt: action.photoAlt,
        faces: [],
        scale: 0,
        canGoNext: false,
      })
    case 'FACE_DETECT_ONE_OR_MORE':
      return Object.assign({}, state, {
        photoUrl: action.photoUrl,
        faces: action.faces,
        scale: action.scale,
      })
    case 'FACE_CROPPED':
      return Object.assign({}, state, {
        croppedPhotoUrl: action.croppedPhotoUrl,
        canGoNext: true,
      })
    default:
      return state
  }
}

export default editFacePhoto
