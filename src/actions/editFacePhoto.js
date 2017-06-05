import AzureClient from '../utils/azureClient'
import S3Client from '../utils/s3Client'

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL

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
