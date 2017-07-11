import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import FirebaseClient from '../utils/firebaseClient'
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

  static propTypes = {
    bandId: PropTypes.string.isRequired,
    onTouchSignUp: PropTypes.func.isRequired,
    onTouchGoPrev: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.phoneNumber.focus()

    this.recaptchaVerifier = FirebaseClient.createRecaptchaVerifier('signup-button')
  }

  submitPhoneNumber = (e) => {
    e.preventDefault()

    const { bandId, phoneNumber, canGoNext } = this.props

    if (!canGoNext) {
      return
    }

    this.props.onTouchSignUp(bandId, '81', phoneNumber, this.recaptchaVerifier)
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
    const { phoneNumber, phoneNumberErrorText, isTermsAgreed, canGoNext } = this.props

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
                  id='signup-button'
                  label='登録'
                  type='submit'
                  disabled={ !canGoNext }
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
    isTermsAgreed: state.editPhoneNumber.isTermsAgreed,
    canGoNext: state.editPhoneNumber.canGoNext,
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
