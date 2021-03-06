import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import { FormattedHTMLMessage } from 'react-intl'
import FirebaseClient from '../utils/firebaseClient'
import * as EditPhoneNumberActions from '../actions/editPhoneNumber'
import I18n from '../utils/i18n'

import Spinner from '../components/Spinner'

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
    isLoading: PropTypes.bool.isRequired,
    onTouchSignUp: PropTypes.func.isRequired,
    onTouchGoPrev: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.phoneNumberText.focus()

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
    const { phoneNumber, phoneNumberErrorText, isTermsAgreed, canGoNext, intl, isLoading } = this.props

    return (
      <Row className='edit-phone-number'>
        <Spinner top={ 30 } isLoading={ isLoading } />
        <Col xs={12}>
          <form onSubmit={this.submitPhoneNumber}>
            <Row>
              <Col xs={12}>
                <TextField
                  hintText={ I18n.t(intl, 'editPhoneNumber.phoneNumber') }
                  errorText={phoneNumberErrorText}
                  value={phoneNumber}
                  onChange={this.changePhoneNumber}
                  style={styles.fullWidth}
                  ref={el => this.phoneNumberText = el}
                  disabled={ isLoading }
                />
              </Col>
            </Row>
            <Row start='xs'>
              <Col xs={1}>
                <Checkbox
                  checked={isTermsAgreed}
                  onCheck={this.checkTermsAgreed}
                  style={styles.checkbox}
                  disabled={ isLoading }
                />
              </Col>
              <Col xs={11}>
                <p style={{marginTop: '17px'}}>
                  <FormattedHTMLMessage
                    id='editPhoneNumber.agree'
                    defaultMessage=''
                  />
                </p>
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
                  label={ I18n.t(intl, 'editPhoneNumber.register') }
                  type='submit'
                  disabled={ !canGoNext || isLoading }
                  primary={true}
                  style={styles.fullWidth}
                />
              </Col>
              <Col xs={6}>
                <FlatButton
                  label={ I18n.t(intl, 'editPhoneNumber.back') }
                  onTouchTap={this.goBack}
                  style={styles.fullWidth}
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

function mapStateToProps(state) {
  return {
    phoneNumber: state.editPhoneNumber.phoneNumber,
    phoneNumberErrorText: state.editPhoneNumber.phoneNumberErrorText,
    isTermsAgreed: state.editPhoneNumber.isTermsAgreed,
    canGoNext: state.editPhoneNumber.canGoNext,
    intl: state.intl,
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
