import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class EditPhoneNumber extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      phoneNumberErrorText: '',
    }
  }

  submitPhoneNumber = (e) => {
    e.preventDefault()
    if (!this.state.phoneNumber || this.state.phoneNumberErrorText) {
      return
    }
    alert('Phone saved');
    this.setState({
      phoneNumber: '',
      phoneNumberErrorText: '',
    })
  }

  goBack = (e) => {
    alert('Go Back');
  }

  changePhoneNumber = (event, value) => {
    let errorText = '';
    if (!/^[\d\-]*$/.test(value)){errorText='不正な文字が含まれています'}
    this.setState({
      phoneNumber: value,
      phoneNumberErrorText: errorText,
    })
  }

  render() {
    return (
      <div className='edit-credit-card'>
        <form onSubmit={this.submitPhoneNumber}>
          <TextField
            hintText='電話番号'
            errorText={this.state.phoneNumberErrorText}
            value={this.state.phoneNumber}
            onChange={this.changePhoneNumber}
          />
          <br/>
          <RaisedButton label='登録'
            type='submit'
            disabled={!this.state.phoneNumber || this.state.phoneNumberErrorText}
            primary={true}
          >
          </RaisedButton>
          <FlatButton label="戻る" onTouchTap={this.goBack}/>
        </form>
      </div>
    )
  }
}

export default EditPhoneNumber;
