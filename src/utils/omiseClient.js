import axios from 'axios'

const pKey = process.env.REACT_APP_OMISE_P_KEY

const createToken = (card, cbSuccess, cbError) => {

  const data = {
    card: {
      'name': 'a001',
      'number': card.cardNo,
      'expiration_month': card.month,
      'expiration_year': card.year,
      'security_code': card.securityCode,
    }
  }

  const base64Encoded = new Buffer(pKey + ':').toString('base64')
  const config = {
    headers: {
      'Authorization': 'Basic ' + base64Encoded,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Omise-Version': '2015-11-17',
    }
  }

  axios.post(
    'https://vault.omise.co/tokens',
    data,
    config
  )
  .then(function (res) {
    console.log(res)
    cbSuccess(res.data.id)
  })
  .catch(function (err) {
    console.log('ERROR Tokenize credit card', err)
    cbError(err)
  })
}

module.exports = {
  createToken,
}
