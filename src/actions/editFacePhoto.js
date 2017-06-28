import AzureClient from '../utils/azureClient'
import S3Client from '../utils/s3Client'
import loadImage from 'blueimp-load-image'

const toBinary = (dataURL) => {
  const bin = atob(dataURL.replace(/^.*,/, ''))
  const buffer = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
  }
  return buffer;
}

const toBlob = (dataURL, type) => {
  const buf = toBinary(dataURL)
  return new Blob([buf.buffer], {
      type: type
  })
}

const findFaces = (bandId, file, dataURL, photoUrl, scale, dispatch) => {
  AzureClient.detectFaces(photoUrl,
    res => {
      if (!res.data || res.data.length === 0) {
        dispatch({
          type: 'FACE_DETECT_NONE',
        })
      } else {
        const faces = res.data
        dispatch({
          type: 'FACE_DETECT_ONE_OR_MORE',
          photoUrl: photoUrl,
          faces: faces,
          scale: scale,
        })
        if (faces.length === 1) {
          // TODO: こそっと画像加工＆URL更新
          const face = faces[0].faceRectangle
          const options = {
            crop: true,
            left: face.left,
            top: face.top,
            sourceWidth: face.width,
            sourceHeight: face.height,
          }
          console.log(options)
          const blob = toBlob(dataURL, file.type)
          loadImage(blob, (canvas) => {
            const dataURL2 = canvas.toDataURL(file.type)
            const timestamp = new Date().getTime()
            const filename = 'face_photos/' + bandId + '/' + timestamp + '_' + file.name
            S3Client.upload(filename, file.type, dataURL2,
              data => {
                alert(data.Location)
              },
              err => {
              }
            )
          }, options)
        }
      }
    },
    err => {
      dispatch({
        type: 'FACE_DETECT_FAILED',
      })
    }
  )
}

const uploadFile = (bandId, file, dataURL, scale, dispatch) => {
  const timestamp = new Date().getTime()
  const filename = 'face_photos/' + bandId + '/' + timestamp + '_' + file.name
  S3Client.upload(filename, file.type, dataURL,
    data => {
      findFaces(bandId, file, dataURL, data.Location, scale, dispatch)
    },
    err => {
    }
  )
}

const changePhoto = (bandId, file, imgElWidth) => {
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
        const scale = imgElWidth / canvas.width
        uploadFile(bandId, file, dataURL, scale, dispatch)
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
