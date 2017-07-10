import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import firebase from 'firebase'
import { firebaseAuth } from '../firebase/'
import * as EditPhoneNumberActions from '../actions/editPhoneNumber'

const styles = {
  fullWidth: {
    width: '100%'
  },
  checkbox: {
    marginTop: '16px'
  },
  buttons: {
    marginTop: '10px'
  }
}

class EditPhoneNumber extends Component {

  componentDidMount() {
    this.phoneNumber.focus()

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('register-button', {
      'size': 'invisible',
      'callback': (res) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(res)
      }
    })
  }

  submitPhoneNumber = (e) => {
    e.preventDefault()

    const { phoneNumber, phoneNumberErrorText, isTermsAgreed } = this.props

    if (!phoneNumber || phoneNumber.length < 1 || phoneNumberErrorText || !isTermsAgreed) {
      return
    }

    // alert('Phone saved')
    const appVerifier = this.recaptchaVerifier
    firebaseAuth.signInWithPhoneNumber('+' + phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          alert('SUCCESS')
        }).catch(function (error) {
          // Error; SMS not sent
          // ...
          console.log(error)
        });
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoneNumber = (event, value) => {
    this.props.actions.changePhoneNumber(value)
  }

  checkTermsAgreed = (event, isInputChecked) => {
    this.props.actions.checkTermsAgreed(isInputChecked)
  }

  render() {
    const { phoneNumber, phoneNumberErrorText, isTermsAgreed } = this.props

    return (
      <Row className='edit-phone-number'>
        <Col xs={12}>
          <form onSubmit={this.submitPhoneNumber}>
            <Row>
              <Col xs={12}>
                <TextField
                  hintText='電話番号'
                  errorText={phoneNumberErrorText}
                  value={phoneNumber}
                  onChange={this.changePhoneNumber}
                  style={styles.fullWidth}
                  ref={el => this.phoneNumber = el}
                />
              </Col>
            </Row>
            <Row start='xs'>
              <Col xs={12}>
                <Checkbox
                  checked={isTermsAgreed}
                  label='本サービス利用規約及びプライバシーポリシーに同意する'
                  onCheck={this.checkTermsAgreed}
                  style={styles.checkbox}
                />
              </Col>
            </Row>
            <Row start='xs'>
              <Col xs={12}>
                <div id='recaptcha-container'></div>
              </Col>
            </Row>
            <Row style={styles.buttons}>
              <Col xs={6}>
                <RaisedButton
                  id='register-button'
                  label='登録'
                  type='submit'
                  disabled={!phoneNumber || phoneNumber.length < 1 || phoneNumberErrorText.length > 0 || !isTermsAgreed}
                  primary={true}
                  style={styles.fullWidth}
                />
              </Col>
              <Col xs={6}>
                <FlatButton
                  label="戻る"
                  onTouchTap={this.goBack}
                  style={styles.fullWidth}
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    phoneNumber: state.editPhoneNumber.phoneNumber,
    phoneNumberErrorText: state.editPhoneNumber.phoneNumberErrorText,
    isTermsAgreed:state.editPhoneNumber.isTermsAgreed,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EditPhoneNumberActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPhoneNumber)
