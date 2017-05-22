import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery'
window.$ = window.jQuery = $;
require('jquery.facedetection');
import AWS from 'aws-sdk';

import defaultPhoto from '../img/default_photo.png'

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class EditFacePhoto extends Component {

  componentDidMount() {
    this.$el = $(this.el);
    //this.$el.faceDetection('');

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('load', this.handleChange);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.children !== this.props.children) {
    //   this.$el.trigger("faceDetection:updated");
    // }
  }

  componentWillUnmount() {
    this.$el.off('load', this.handleChange);
    // this.$el.faceDetection('destroy');
  }

  handleChange(e) {
    // var params = {
    //   "returnFaceId": "true",
    //   "returnFaceLandmarks": "true",
    //   "returnFaceAttributes": "age,gender",
    // };

    // $.ajax({
    //   url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
    //   beforeSend: function(xhrObj){
    //     xhrObj.setRequestHeader("Content-Type","application/json");
    //     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ba8c31c918864b969eb1601590167f93");
    //   },
    //   type: "POST",
    //   data: "{'url':'https://s3-ap-northeast-1.amazonaws.com/fespay-dev/tmp/IMG_0631.JPG'}",
    // })
    // .done(function(data) {
    //   alert("success");
    //   console.log(data)
    // })
    // .fail(function(err) {
    //   alert("error");
    //   console.log(err)
    // });

    // $('.facial-image-border').remove();
    // this.$el.faceDetection({
    //   complete: function (obj) {
    //     if (typeof(obj)=="undefined") {
    //       alert("顔情報を認識できませんでした…。") ;
    //       return false ;
    //     } else {
    //       // 人数分だけループ処理する
    //       for ( var i=0 ; i<obj.length ; i++ ) {
    //         // ラッパー要素内に、顔範囲を示すdiv要素を追加
    //         // e.target.after( '<div class="facial-image-border"></div>' ) ;
    //         $('#face-image-wrapper').append('<div class="facial-image-border"></div>')

    //         // 顔範囲の場所を動的に指定
    //         $(".facial-image-border").eq(i).css( {
    //           left:obj[i].x * obj[i].scaleX + "px" ,
    //           top:obj[i].y * obj[i].scaleY + "px" ,
    //           width:obj[i].width  * obj[i].scaleX + "px" ,
    //           height:obj[i].height * obj[i].scaleY + "px"
    //         });
    //       }
    //     }
    //     console.log(obj);
    //   },
    //   error:function(code, message) {
    //     alert("Error:[" + code + "]" + message);
    //   }
    // });
  }

  constructor(props) {
    super(props)

    this.state = {
      photoUrl: '',
      photoAlt: ''
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
      photoAlt: ''
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
    const { bandId } = this.props

    const files = e.target.files
    if (!files.length) {
      return alert('Please choose a file to upload first.')
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
      that.setState({photoUrl: dataURL, photoAlt: file.name})

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

  render() {
    const { photoUrl, photoAlt } = this.state

    return (
      <div className='edit-face-photo'>
        <form
          encType='multipart/form-data'
          onSubmit={this.submitFacePhoto}
        >
          <a id="face-image-wrapper" href="Javascript:document.getElementById('itsme').click();">
            <img id="AA" src={photoUrl ? photoUrl : defaultPhoto} alt={photoAlt} ref={el => this.el = el} />
          </a>
          <input id="itsme" type="file" accept="image/*" onChange={this.changePhoto} style={{display: 'none'}} />
          <br/>
          <RaisedButton label='次へ'
            type='submit'
            disabled={!this.state.photoUrl}
            primary={true}
          >
          </RaisedButton>
          <FlatButton label="戻る" onTouchTap={this.goBack}/>
        </form>
      </div>
    )
  }
}

EditFacePhoto.propTypes = {
  onTouchGoNext: PropTypes.func.isRequired,
  onTouchGoPrev: PropTypes.func.isRequired,
  bandId: PropTypes.string.isRequired,
}

export default EditFacePhoto;
