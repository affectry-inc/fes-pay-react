import * as Types from '../types/editFacePhoto'
import { OPEN_ALERT } from '../types/app'
import AzureClient from '../utils/azureClient'
import S3Client from '../utils/s3Client'
import TimeUtil from '../utils/timeUtils'
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

const cropPhoto = (face, filepath, file, dataURL, dispatch) => {
  const w = face.width,
        h = face.height,
        l = face.left,
        t = face.top
  const nw = w * 2,
        nh = nw * 150/130,
        nl = l - (nw - w) / 2,
        nt = t - (nh - h) / 2
  const options = {
    crop: true,
    left: nl,
    top: nt,
    sourceWidth: nw,
    sourceHeight: nh,
  }
  const blob = toBlob(dataURL, file.type)
  loadImage(blob, (canvas) => {
    const dataURL2 = canvas.toDataURL(file.type)
    S3Client.upload(filepath + 'cropped', file.type, dataURL2,
      data => {
        dispatch({
          type: Types.FACE_CROPPED,
          croppedPhotoUrl: data.Location,
        })
      },
      err => {
      }
    )
  }, options)
}

const findFaces = (filepath, file, dataURL, photoUrl, scale, dispatch) => {
  AzureClient.detectFaces(photoUrl,
    res => {
      if (!res.data || res.data.length === 0) {
        dispatch({
          type: OPEN_ALERT,
          alertMessage: '顔情報を認識できません。違う写真をアップロードしてください。',
        })
      } else {
        const faces = res.data
        dispatch({
          type: Types.FACE_DETECT_ONE_OR_MORE,
          photoUrl: photoUrl,
          faces: faces,
          scale: scale,
        })
        if (faces.length === 1) {
          const face = faces[0].faceRectangle
          cropPhoto(face, filepath, file, dataURL, dispatch)
        } else {
          dispatch({
            type: OPEN_ALERT,
            alertMessage: '複数の顔を認識しました。違う写真をアップロードしてください。',
          })
        }
      }
    },
    err => {
      dispatch({
        type: OPEN_ALERT,
        alertMessage: '顔情報の認識に失敗しました。違う写真をアップロードしてください。',
      })
    }
  )
}

const uploadFile = (bandId, file, dataURL, scale, dispatch) => {
  const filepath = 'face_photos/' + bandId + '/' + TimeUtil.fullFormat() + '/'
  S3Client.upload(filepath + 'original', file.type, dataURL,
    data => {
      findFaces(filepath, file, dataURL, data.Location, scale, dispatch)
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
          type: Types.CHANGE_PHOTO,
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
    type: OPEN_ALERT,
    alertMessage: '画像を選択してください。',
  }
}

module.exports = {
  changePhoto,
  alertNotImage,
}
