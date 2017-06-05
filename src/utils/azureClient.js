import axios from 'axios'

const post = (endPoint, params, data, cbSuccess, cbError) => {
  const params_url = Object.keys(params).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'ba8c31c918864b969eb1601590167f93',
    }
  }

  axios.post(
    'https://westus.api.cognitive.microsoft.com/face/v1.0/' + endPoint + '?' + params_url,
    data,
    config
  )
  .then(function (res) {
    console.log(res)
    cbSuccess(res)
  })
  .catch(function (err) {
    console.log(err)
    cbError(err)
  })
}

const detectFaces = (photoUrl, cbSuccess, cbError) => {
  const params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "true",
    "returnFaceAttributes": "age,gender",
  }

  const data = { url: photoUrl }

  return post('detect', params, data, cbSuccess, cbError)
}

module.exports = {
  detectFaces,
}
