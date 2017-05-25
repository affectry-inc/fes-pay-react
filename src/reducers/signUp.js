const initState = {
  stepIndex: 0,
  dispCardNo: '',
  dispPhotoUrl: '',
}

const signUp = (state = initState, action) => {
   console.log(action)
   switch (action.type) {
     case 'SAVE_CREDIT_CARD':
       return Object.assign({}, state, {
         stepIndex: 1,
         dispCardNo: action.dispCardNo,
       })
     case 'SAVE_FACE_PHOTO':
       return Object.assign({}, state, {
         stepIndex: 2,
         dispPhotoUrl: action.dispPhotoUrl,
       })
     case 'RESET_CREDIT_CARD':
       return Object.assign({}, state, {
         stepIndex: 0,
         dispCardNo: '',
       })
     case 'RESET_FACE_PHOTO':
       return Object.assign({}, state, {
         stepIndex: 1,
         dispPhotoUrl: '',
       })
    default:
      return state
  }
}

export default signUp
