import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
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

    const { phoneNumber, phoneNumberErrorText } = this.state

    if (!phoneNumber || phoneNumber.length < 1|| phoneNumberErrorText) {
      return
    }

    alert('Phone saved');

    this.setState({
      phoneNumber: '',
      phoneNumberErrorText: '',
    })
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoneNumber = (event, value) => {
    let errorText = '';
    if (!/^\d*$/.test(value)){errorText='不正な文字が含まれています'}
    this.setState({
      phoneNumber: value,
      phoneNumberErrorText: errorText,
    })
  }

  render() {
    const { phoneNumber, phoneNumberErrorText } = this.state

    return (
      <div className='edit-phone-number'>
        <form onSubmit={this.submitPhoneNumber}>
          <TextField
            hintText='電話番号'
            errorText={phoneNumberErrorText}
            value={phoneNumber}
            onChange={this.changePhoneNumber}
          />
          <br/>
          <RaisedButton label='登録'
            type='submit'
            disabled={!phoneNumber || phoneNumber.length < 1 || phoneNumberErrorText}
            primary={true}
          >
          </RaisedButton>
          <FlatButton label="戻る" onTouchTap={this.goBack}/>
        </form>
        <p>登録をもって、本サービス利用規約及びプライバシーポリシーに同意されたものとみなします。</p>
      </div>
    )
  }
}

export default EditPhoneNumber;
