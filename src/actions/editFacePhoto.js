import AzureClient from '../utils/azureClient'
import S3Client from '../utils/s3Client'
import loadImage from 'blueimp-load-image'

const findFaces = (photoUrl, dstWidth, dispatch) => {
  AzureClient.detectFaces(photoUrl,
    res => {
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
    },
    err => {
      dispatch({
        type: 'FACE_DETECT_FAILED',
      })
    }
  )
}

const uploadFile = (bandId, file, dataURL, dstWidth, dispatch) => {
  const timestamp = new Date().getTime()
  const filename = 'face_photos/' + bandId + '/' + timestamp + '_' + file.name
  S3Client.upload(filename, file.type, dataURL,
    data => {
      dispatch({
        type: 'UPLOAD_PHOTO',
        photoUrl: data.Location,
      })
      findFaces(data.Location, dstWidth, dispatch)
    },
    err => {
    }
  )
}

const changePhoto = (bandId, file) => {
  return dispatch => {
    loadImage.parseMetaData(file, (data) => {
      const options = {
        maxWidth: 1000,
        canvas: true
      }
      if (data.exif) {
        options.orientation = data.exif.get('Orientation')
      }
      loadImage(file, (canvas) => {
        const dataURL = canvas.toDataURL(file.type)
        dispatch({
          type: 'CHANGE_PHOTO',
          photoUrl: dataURL,
          photoAlt: file.name,
        })
        uploadFile(bandId, file, dataURL, 1000, dispatch)
      }, options)
    })
  }
}

const alertNotImage = () => {
  return {
    type: 'ALERT_NOT_IMAGE'
  }
}

const closeAlert = () => {
  return {
    type: 'CLOSE_ALERT'
  }
}

module.exports = {
  changePhoto,
  alertNotImage,
  closeAlert,
}
