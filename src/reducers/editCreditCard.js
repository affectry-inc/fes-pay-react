import * as Types from '../types/editCreditCard'

const initState = {
  cardNo: '',
  cardNoErrorText: '',
  month: '',
  year: '',
  expErrorText: '',
  securityCode: '',
}

const attachCard = (state) => {
  const invalid = !state.cardNo || state.cardNo.length < 14 || state.cardNoErrorText || !state.month || !state.year || state.expErrorText || !state.securityCode

  if (invalid) {
    delete state.card
  } else {
    state.card = {
      cardNo: state.cardNo,
      month: state.month,
      year: state.year,
      securityCode: state.securityCode,
    }
  }

  return state
}

const editCreditCard = (state = initState, action) => {
  let obj
  switch (action.type) {
    case Types.CHANGE_CARD_NO:
      obj = Object.assign({}, state, {
        cardNo: action.cardNo,
        cardNoErrorText: action.cardNoErrorText,
      })
      return attachCard(obj)
    case Types.CHANGE_MONTH:
      obj =  Object.assign({}, state, {
        month: action.month,
        expErrorText: action.expErrorText,
      })
      return attachCard(obj)
    case Types.CHANGE_YEAR:
      obj =  Object.assign({}, state, {
        year: action.year,
        expErrorText: action.expErrorText,
      })
      return attachCard(obj)
    case Types.CHANGE_SECURITY_CODE:
      obj =  Object.assign({}, state, {
        securityCode: action.securityCode,
      })
      return attachCard(obj)
    case Types.CLEAR_ALL:
      obj =  Object.assign({}, state, {
        cardNo: '',
        cardNoErrorText: '',
        month: '',
        year: '',
        securityCode: '',
      })
      return attachCard(obj)
   default:
     return state
  }
}

export default editCreditCard
