import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import defaultPhoto from '../img/default_photo.png'

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class EditFacePhoto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photoUrl: ''
    }
  }

  submitFacePhoto = (e) => {
    e.preventDefault()
    if (!this.state.cardNo || !this.state.year || !this.state.securityCode) {
      return
    }
    alert('Photo saved');
    this.setState({
      photoUrl: '',
    })
  }

  goBack = (e) => {
    alert('Go Back');
  }

  changePhoto = (e) => {
    let files = e.target.files;
    let fileUrl = createObjectURL(files[0]);
    this.setState({photoUrl: fileUrl});
  }

  render() {
    return (
      <div className='edit-face-photo'>
        <form
          enctype='multipart/form-data'
          onSubmit={this.submitFacePhoto}
        >
          <a href="Javascript:document.getElementById('itsme').click();">
            <img src={this.state.photoUrl ? this.state.photoUrl : defaultPhoto} />
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

export default EditFacePhoto;
