import * as Types from '../types/editCreditCard'

const changeCardNo = (cardNo) => {
  return dispatch => {
    let errorText = ''

    if (!/^\d*$/.test(cardNo)){errorText='不正な文字が含まれています'}

    if (cardNo.length > 16) return

    dispatch({
      type: Types.CHANGE_CARD_NO,
      cardNo: cardNo,
      cardNoErrorText: errorText,
    })
  }
}

const changeMonth = (month) => {
  return {
    type: Types.CHANGE_MONTH,
    month: month,
  }
}

const changeYear = (year) => {
  return {
    type: Types.CHANGE_YEAR,
    year: year,
  }
}

const changeSecurityCode = (securityCode) => {
  return {
    type: Types.CHANGE_SECURITY_CODE,
    securityCode: securityCode,
  }
}

module.exports = {
  changeCardNo,
  changeMonth,
  changeYear,
  changeSecurityCode,
}
