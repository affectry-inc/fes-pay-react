const changeCardNo = (cardNo) => {
  return dispatch => {
    let errorText = ''

    if (!/^\d*$/.test(cardNo)){errorText='不正な文字が含まれています'}

    dispatch({
      type: 'CHANGE_CARD_NO',
      cardNo: cardNo,
      cardNoErrorText: errorText,
    })
  }
}

const changeMonth = (month) => {
  return {
    type: 'CHANGE_MONTH',
    month: month,
  }
}

const changeYear = (year) => {
  return {
    type: 'CHANGE_YEAR',
    year: year,
  }
}

const changeSecurityCode = (securityCode) => {
  return {
    type: 'CHANGE_SECURITY_CODE',
    securityCode: securityCode,
  }
}

module.exports = {
  changeCardNo,
  changeMonth,
  changeYear,
  changeSecurityCode,
}
