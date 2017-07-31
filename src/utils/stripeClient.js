import axios from 'axios'

const pKey = 'pk_test_9wFJNMfuvJ3a2QEdjhXNMrat'

const createToken = (card, cbSuccess, cbError) => {

  const data = 'card[number]=' + card.cardNo
    + '&card[exp_month]=' + card.month
    + '&card[exp_year]=' + card.year
    + '&card[cvc]=' + card.securityCode

  const config = {
    headers: {
      'Authorization': 'Bearer ' + pKey,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  axios.post(
    'https://api.stripe.com/v1/tokens',
    data,
    config
  )
  .then(function (res) {
    console.log(res)
    cbSuccess(res.data.id)
  })
  .catch(function (err) {
    console.log('ERROR Tokenize credit card', err)
    console.log(JSON.stringify(err))
    cbError(err)
  })
}

module.exports = {
  createToken,
}
