import * as Types from '../types/reRegister'

const initState = {
  isPrivileged: false,
  isLoading: true,
}

function reRegister(state = initState, action){
  switch (action.type) {
    case Types.DISP_LOADER:
      return Object.assign({}, state, {
        isLoading: true,
      })

    case Types.PRIVILEGED:
      return Object.assign({}, state, {
        isPrivileged: true,
        isLoading: false,
      })

    case Types.NO_PRIVILEGE:
      return Object.assign({}, state, {
        isPrivileged: false,
        isLoading: false,
      })

    default:
      return state
  }
}

export default reRegister
