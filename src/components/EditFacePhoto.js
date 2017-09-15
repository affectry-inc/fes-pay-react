import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { CardMedia, CardTitle } from 'material-ui/Card'
import * as EditFacePhotoActions from '../actions/editFacePhoto'
import I18n from '../utils/i18n'

import Spinner from '../components/Spinner'

import defaultPhoto from '../img/default_photo.png'

const styles = {
  fullWidth: {
    width: '100%'
  },
  buttons: {
    marginTop: '16px'
  },
  disabledAnchor: {
    pointerEvents: 'none',
    cursor: 'default'
  }
}

class EditFacePhoto extends Component {

  componentWillUnmount() {
    this.props.actions.clearAll()
  }

  clickImg = (e) => {
    e.preventDefault()

    document.getElementById('file-uploader').click()
  }

  submitFacePhoto = (e) => {
    e.preventDefault()

    const { bandId, croppedPhotoUrl } = this.props

    if (!croppedPhotoUrl) {
      return
    }

    this.props.onTouchGoNext(bandId, croppedPhotoUrl)
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoto = (e) => {
    const { bandId, actions } = this.props

    const file = e.target.files[0]

    if (!file) return

    if(!/image/.test(file.type)) {
      actions.alertNotImage()
      return
    }

    actions.changePhoto(bandId, file, this.img.width)
  }

  render() {
    const { photoUrl, photoAlt, faces, scale, canGoNext, intl, isLoading } = this.props

    let list = []
    faces.map(obj => {
      const face = obj.faceRectangle
      const style = {
        left: face.left * scale + "px" ,
        top: face.top * scale + "px" ,
        width: face.width * scale + "px" ,
        height: face.height * scale + "px",
        position: 'absolute',
        border: '4px solid rgb(100, 221, 23)'
      }
      return list.push(
        <div key={ obj.faceId } style={ style }></div>
      )
    })

    return (
      <Row className='edit-face-photo'>
        <Spinner top={ 150 } isLoading={ isLoading } />
        <Col xs={ 12 }>
          <form
            encType='multipart/form-data'
            onSubmit={ this.submitFacePhoto }
          >
            <Row>
              <Col xs={ 12 }>
                <a
                  href=""
                  style={ isLoading ? styles.disabledAnchor : {} }
                  onClick={ this.clickImg }>
                  <CardMedia
                    overlay={
                      (canGoNext || isLoading) ? null : <CardTitle title={ I18n.t(intl, 'editFacePhoto.tap') } />
                    }
                  >
                    <img
                      src={ photoUrl ? photoUrl : defaultPhoto }
                      alt={ photoAlt }
                      ref={ el => this.img = el }
                      style={ styles.fullWidth }
                    />
                  </CardMedia>
                  { list }
                </a>
                <input
                  id="file-uploader"
                  type="file"
                  accept="image/*"
                  onChange={ this.changePhoto }
                  style={ {display: 'none'} }
                />
              </Col>
            </Row>
            <Row style={ styles.buttons }>
              <Col xs={ 6 }>
                <RaisedButton
                  label={ I18n.t(intl, 'editFacePhoto.next') }
                  type='submit'
                  disabled={ !canGoNext || isLoading }
                  primary={ true }
                  style={ styles.fullWidth }
                />
              </Col>
              <Col xs={ 6 }>
                <FlatButton
                  label={ I18n.t(intl, 'editFacePhoto.back') }
                  onTouchTap={ this.goBack }
                  style={ styles.fullWidth }
                  disabled={ isLoading }
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

EditFacePhoto.propTypes = {
  bandId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onTouchGoNext: PropTypes.func.isRequired,
  onTouchGoPrev: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    photoUrl: state.editFacePhoto.photoUrl,
    photoAlt: state.editFacePhoto.photoAlt,
    croppedPhotoUrl: state.editFacePhoto.croppedPhotoUrl,
    faces: state.editFacePhoto.faces,
    scale: state.editFacePhoto.scale,
    canGoNext: state.editFacePhoto.canGoNext,
    intl: state.intl,
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
