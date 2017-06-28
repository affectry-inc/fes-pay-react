const initState = {
  photoUrl: '',
  photoAlt: '',
  faces: [],
  scale: 0,
  alertOpen: false,
  alertMessage: '',
  canGoNext: false,
}

const editFacePhoto = (state = initState, action) => {
  console.log(action)
  switch (action.type) {
    case 'CHANGE_PHOTO':
      return Object.assign({}, state, {
        photoUrl: action.photoUrl,
        photoAlt: action.photoAlt,
        faces: [],
        scale: 0,
        canGoNext: false,
      })
    case 'FACE_DETECT_NONE':
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: '顔情報を認識できません。違う写真をアップロードしてください。',
      })
    case 'FACE_DETECT_ONE_OR_MORE':
      return Object.assign({}, state, {
        photoUrl: action.photoUrl,
        faces: action.faces,
        scale: action.scale,
        alertOpen: action.faces.length > 1,
        alertMessage: '複数の顔を認識しました。違う写真をアップロードしてください。',
        canGoNext: action.faces.length === 1,
      })
    case 'FACE_DETECT_FAILED':
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: '顔情報の認識に失敗しました。違う写真をアップロードしてください。',
      })
    case 'ALERT_NOT_IMAGE':
      return Object.assign({}, state, {
        alertOpen: true,
        alertMessage: '画像を選択してください。',
      })
    case 'CLOSE_ALERT':
      return Object.assign({}, state, {
        alertOpen: false,
      })
   default:
     return state
  }
}

export default editFacePhoto
