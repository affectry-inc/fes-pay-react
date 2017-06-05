import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Alert from './Alert'
import * as EditFacePhotoActions from '../actions/editFacePhoto'

import defaultPhoto from '../img/default_photo.png'

class EditFacePhoto extends Component {

  clickImg = (e) => {
    e.preventDefault()

    document.getElementById('file-uploader').click()
  }

  submitFacePhoto = (e) => {
    e.preventDefault()

    const { bandId, photoUrl } = this.props

    if (!photoUrl) {
      return
    }

    this.props.onTouchGoNext(bandId, photoUrl)
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoto = (e) => {
    const { bandId, actions } = this.props

    const files = e.target.files
    if (!files.length) {
      return false
    }
    const file = files[0]

    actions.changePhoto(bandId, file)
  }

  render() {
    const { photoUrl, photoAlt, faces, scale, alertOpen, alertMessage, canGoNext, actions } = this.props

    let list = []
    faces.map(obj => {
      const face = obj.faceRectangle
      const style = {
        left: face.left * scale + "px" ,
        top: face.top * scale + "px" ,
        width: face.width * scale + "px" ,
        height: face.height * scale + "px"
      }
      return list.push(
        <div key={obj.faceId} className="facial-image-border" style={style}></div>
      )
    })

    return (
      <div className='edit-face-photo'>
        <form
          encType='multipart/form-data'
          onSubmit={this.submitFacePhoto}
        >
          <a id="face-image-wrapper" href="" onClick={this.clickImg}>
            <img id="AA" src={photoUrl ? photoUrl : defaultPhoto} alt={photoAlt} ref={el => this.el = el} />
            {list}
          </a>
          <input id="file-uploader" type="file" accept="image/*" onChange={this.changePhoto} style={{display: 'none'}} />
          <br/>
          <RaisedButton label='次へ'
            type='submit'
            disabled={!canGoNext}
            primary={true}
          >
          </RaisedButton>
          <FlatButton label="戻る" onTouchTap={this.goBack}/>
        </form>
        <Alert
          onCloseAlert={actions.closeAlert}
          open={alertOpen}
          message={alertMessage}
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
    photoUrl: state.editFacePhoto.photoUrl,
    photoAlt: state.editFacePhoto.photoAlt,
    faces: state.editFacePhoto.faces,
    scale: state.editFacePhoto.scale,
    alertOpen: state.editFacePhoto.alertOpen,
    alertMessage: state.editFacePhoto.alertMessage,
    canGoNext: state.editFacePhoto.canGoNext,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EditFacePhotoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFacePhoto)
