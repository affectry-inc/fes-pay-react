import AWS from 'aws-sdk'
import axios from 'axios'

let s3Client;

const s3 = () => {
  if (s3Client) return s3Client

  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:77037c03-1409-4206-b041-05b9c4f1a7ea'
    })
  })

  s3Client = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'fespay-dev'}
  })

  return s3Client
}

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL

const dataURLtoBlob = (dataurl, type) => {
  const bin = atob(dataurl.split("base64,")[1])
  const len = bin.length
  const barr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    barr[i] = bin.charCodeAt(i)
  }
  return new Blob([barr], {
    type: type,
  })
}

const findFaces = (photoUrl, dstWidth, dispatch) => {
  const params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "true",
    "returnFaceAttributes": "age,gender",
  }

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
    'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?' + params_url,
    { url: photoUrl },
    config
  )
  .then(function (res) {
    console.log(res)
    if (!res.data || res.data.length === 0) {
      dispatch({
        type: 'FACE_DETECT_NONE',
      })
    } else {
      const faces = res.data
      const scale = 500 / dstWidth
      dispatch({
        type: 'FACE_DETECT_ONE_OR_MORE',
        faces: faces,
        scale: scale,
      })
    }
  })
  .catch(function (err) {
    dispatch({
      type: 'FACE_DETECT_FAILED',
    })
    console.log(err)
  })
}

const uploadPhoto = (blob, filename, filetype, dstWidth, dispatch) => {
  s3().upload(
    {Key: filename, ContentType: filetype, Body: blob, ACL: "public-read"},
    function(err, data){
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        dispatch({
          type: 'UPLOAD_PHOTO',
          photoUrl: data.Location,
        })
        findFaces(data.Location, dstWidth, dispatch)
      }
    }
  )
}

const changePhoto = (bandId, file) => {
  return dispatch => {
    const scale = 0.5
    const image = new Image()
    image.crossOrigin = "Anonymous"
    image.onload = function(event){
      const dstWidth = this.width * scale
      const dstHeight = this.height * scale
      const canvas = document.createElement('canvas')
      canvas.width = dstWidth
      canvas.height = dstHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight)
      const dataURL = canvas.toDataURL(file.type)
      dispatch({
        type: 'CHANGE_PHOTO',
        photoUrl: dataURL,
        photoAlt: file.name,
      })

      const blob = dataURLtoBlob(dataURL, file.type)
      const timestamp = new Date().getTime()
      const filename = 'face_photos/' + bandId + '/' + timestamp + '_' + file.name
      uploadPhoto(blob, filename, file.type, dstWidth, dispatch)
    }
    image.src = createObjectURL(file)
  }
}

const closeAlert = () => {
  return {
    type: 'CLOSE_ALERT'
  }
}

module.exports = {
  changePhoto,
  closeAlert,
}
