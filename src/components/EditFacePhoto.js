import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AWS from 'aws-sdk';
import axios from 'axios'
import Alert from './Alert'

import defaultPhoto from '../img/default_photo.png'

import * as SignUpActions from '../actions/signUp'

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class EditFacePhoto extends Component {

  constructor(props) {
    super(props)

    this.state = {
      photoUrl: '',
      photoAlt: '',
      faces: [],
      scale: 0,
      alertOpen: false,
      alertMessage: '',
      canGoNext: false,
    }
  }

  submitFacePhoto = (e) => {
    e.preventDefault()

    const { photoUrl } = this.state

    if (!photoUrl) {
      return
    }

    this.props.onTouchGoNext(photoUrl)

    this.setState({
      photoUrl: '',
      photoAlt: '',
      faces: [],
      scale: 0,
      alertOpen: false,
      alertMessage: '',
      canGoNext: false,
    })
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  s3_client = () => {
    if (this.s3) return this.s3

    AWS.config.update({
      region: 'us-east-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:77037c03-1409-4206-b041-05b9c4f1a7ea'
      })
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: 'fespay-dev'}
    });

    return this.s3
  }

  changePhoto = (e) => {
    const { bandId, actions } = this.props

    const files = e.target.files
    if (!files.length) {
      return false
    }
    const file = files[0]

    const that = this
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
      that.setState({
        photoUrl: dataURL,
        photoAlt: file.name,
        faces: [],
        scale: 0,
        canGoNext: false,
      })

      const blob = that.dataURLtoBlob(dataURL, file.type)
      const timestamp = new Date().getTime()
      const filename = 'face_photos/' + bandId + '/' + timestamp + '_' + file.name
      that.s3_client().upload(
        {Key: filename, ContentType: file.type, Body: blob, ACL: "public-read"},
        function(err, data){
          if (err) {
            console.log(err)
          } else {
            console.log(data)
            that.setState({photoUrl: data.Location})
            that.findFaces(data.Location, dstWidth)
            actions.addFace(data.Location)
          }
        }
      )
    }
    image.src = createObjectURL(file)
  }

  dataURLtoBlob = (dataurl, type) => {
    const bin = atob(dataurl.split("base64,")[1]);
    const len = bin.length;
    const barr = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      barr[i] = bin.charCodeAt(i)
    }
    return new Blob([barr], {
      type: type,
    })
  }

  findFaces = (photoUrl, dstWidth) => {
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
      console.log(res);
      if (!res.data || res.data.length === 0) {
        this.setState({
          alertOpen: true,
          alertMessage: '顔情報を認識できません。違う写真をアップロードしてください。',
        })
      } else {
        const faces = res.data
        const scale = 500 / dstWidth
        this.setState({
          faces: faces,
          scale: scale,
          alertOpen: faces.length > 1,
          alertMessage: '複数の顔を認識しました。違う写真をアップロードしてください。',
          canGoNext: faces.length === 1,
        })
      }
    }.bind(this))
    .catch(function (err) {
      this.setState({
        alertOpen: true,
        alertMessage: '顔情報を認識できません。違う写真をアップロードしてください。',
      })
      console.log(err);
    })
  }

  closeDialog = () => {
    this.setState({alertOpen: false});
  };

  render() {
    const { photoUrl, photoAlt, faces, scale } = this.state

    let list = []
    faces.map(obj => {
      const face = obj.faceRectangle
      const style = {
        left: face.left * scale + "px" ,
        top: face.top * scale + "px" ,
        width: face.width * scale + "px" ,
        height: face.height * scale + "px"
      }
      list.push(
        <div key={obj.faceId} className="facial-image-border" style={style}></div>
      )
    })

    return (
      <div className='edit-face-photo'>
        <form
          encType='multipart/form-data'
          onSubmit={this.submitFacePhoto}
        >
          <a id="face-image-wrapper" href="Javascript:document.getElementById('itsme').click();">
            <img id="AA" src={photoUrl ? photoUrl : defaultPhoto} alt={photoAlt} ref={el => this.el = el} />
            {list}
          </a>
          <input id="itsme" type="file" accept="image/*" onChange={this.changePhoto} style={{display: 'none'}} />
          <br/>
          <RaisedButton label='次へ'
            type='submit'
            disabled={!this.state.canGoNext}
            primary={true}
          >
          </RaisedButton>
          <FlatButton label="戻る" onTouchTap={this.goBack}/>
        </form>
        <Alert
          onCloseAlert={this.closeDialog}
          open={this.state.alertOpen}
          message={this.state.alertMessage}
        />
      </div>
    )
  }
}

EditFacePhoto.propTypes = {
  onTouchGoNext: PropTypes.func.isRequired,
  onTouchGoPrev: PropTypes.func.isRequired,
  bandId: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFacePhoto);
