const initState = {
  stepIndex: 0,
  dispCardNo: '',
  dispPhotoUrl: '',
}

const signUp = (state = initState, action) => {
   console.log(action)
   switch (action.type) {
     case 'GO_NEXT':
       return Object.assign({}, state, { stepIndex: 1 });
    default:
      return state
  }
}

export default signUp
