import axios from 'axios'

const SUBSCRIPTION_KEY = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY
const END_POINT = process.env.REACT_APP_AZURE_END_POINT

const _post = (urlTail, params, data, cbSuccess, cbError) => {
  const params_url = Object.keys(params).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    }
  }

  axios.post(
    END_POINT + urlTail + '?' + params_url,
    data,
    config
  )
  .then(function (res) {
    console.log(res)
    if (cbSuccess) cbSuccess(res)
  })
  .catch(function (err) {
    console.log(err)
    if (cbError) cbError(err)
  })
}

const _put = (urlTail, data, cbSuccess, cbError) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    }
  }

  axios.put(
    END_POINT + urlTail,
    data,
    config
  )
  .then(function (res) {
    console.log(res)
    if (cbSuccess) cbSuccess(res)
  })
  .catch(function (err) {
    console.log(err)
    if (cbError) cbError(err)
  })
}

const _delete = (urlTail, cbSuccess, cbError) => {
  const config = {
    headers: {
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    }
  }

  axios.delete(
    END_POINT + urlTail,
    config
  )
  .then(function (res) {
    console.log(res)
    if (cbSuccess) cbSuccess(res)
  })
  .catch(function (err) {
    console.log(err)
    if (cbError) cbError(err)
  })
}

const detectFaces = (photoUrl, cbSuccess, cbError) => {
  const params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "true",
    "returnFaceAttributes": "age,gender",
  }

  const data = { url: photoUrl }

  return _post('detect', params, data, cbSuccess, cbError)
}

/*
 * 4. Add a face photo to the person
 *
 * post method returns a persistedFaceId
 *
 */
const addPersonFace = (personGroupId, personId, photoUrl, cbSuccess, cbError) => {
  const urlTail = 'persongroups/' + personGroupId + '/persons/' + personId + '/persistedFaces'
  const data = { url: photoUrl }
  _post(urlTail, {}, data,
    res => {
      cbSuccess(personId, res.data.persistedFaceId)
    },
    err => {
      cbError({message: '画像の登録に失敗しました。再度登録を行ってください。'})
    }
  )
}

/*
 * 3. Add a person to the personGroup
 *
 * post method retuns a personId
 *
 */
const createPerson = (personGroupId, photoUrl, cbSuccess, cbError) => {
  const urlTail = 'persongroups/' + personGroupId + '/persons'
  const data = { name: personGroupId }
  _post(urlTail, {}, data,
    res => {
      addPersonFace(personGroupId, res.data.personId, photoUrl, cbSuccess, cbError)
    },
    err => {
      cbError({message: '画像の登録に失敗しました。再度登録を行ってください。'})
    }
  )
}

/*
 * 2. Create a personGroup
 */
const createPersonGroup = (personGroupId, photoUrl, cbSuccess, cbError) => {
  const urlTail = 'persongroups/' + personGroupId
  const data = { name: personGroupId }
  _put(urlTail, data,
    res => {
      createPerson(personGroupId, photoUrl, cbSuccess, cbError)
    },
    err => {
      cbError({message: '画像の登録に失敗しました。再度登録を行ってください。'})
    }
  )
}

/*
 * 1. Reset (delete) the personGroup
 *
 * personGroupId = bandId
 *
 */
const registerPerson = (personGroupId, photoUrl, cbSuccess, cbError) => {
  const urlTail = 'persongroups/' + personGroupId
  _delete(urlTail,
    res => {
      createPersonGroup(personGroupId, photoUrl, cbSuccess, cbError)
    },
    err => {
      createPersonGroup(personGroupId, photoUrl, cbSuccess, cbError)
    }
  )
}

module.exports = {
  detectFaces,
  registerPerson,
}
