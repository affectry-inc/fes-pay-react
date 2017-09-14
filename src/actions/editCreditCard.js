import * as Types from '../types/editCreditCard'

import I18n from '../utils/i18n'

const changeCardNo = (cardNo) => {
  return (dispatch, getState) => {
    let errorText = ''

    if (!/^\d*$/.test(cardNo)) {errorText=I18n.t(getState().intl, 'editCreditCard.invalidChars')}

    if (cardNo.length > 16) return

    dispatch({
      type: Types.CHANGE_CARD_NO,
      cardNo: cardNo,
      cardNoErrorText: errorText,
    })
  }
}

const isExpired = (month, year) => {
  if (month && year) {
    const now = new Date()
    if (year < now.getFullYear()) {
      return true
    } else if (year === now.getFullYear() && month < (now.getMonth() + 1)) {
      return true
    }
  }
  return false
}

const changeMonth = (month) => {
  return (dispatch, getState) => {
    const expError = isExpired(month, getState().editCreditCard.year)

    dispatch({
      type: Types.CHANGE_MONTH,
      month: month,
      expErrorText: expError ? I18n.t(getState().intl, 'editCreditCard.expired') : ''
    })
  }
}

const changeYear = (year) => {
  return (dispatch, getState) => {
    const expError = isExpired(getState().editCreditCard.month, year)

    dispatch({
      type: Types.CHANGE_YEAR,
      year: year,
      expErrorText: expError ? I18n.t(getState().intl, 'editCreditCard.expired') : ''
    })
  }
}

const changeSecurityCode = (securityCode) => {
  return {
    type: Types.CHANGE_SECURITY_CODE,
    securityCode: securityCode,
  }
}

const clearAll = () => {
  return {
    type: Types.CLEAR_ALL,
  }
}

module.exports = {
  changeCardNo,
  changeMonth,
  changeYear,
  changeSecurityCode,
  clearAll,
}
