import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { FormattedHTMLMessage } from 'react-intl'

import Spinner from '../components/Spinner'
import FirebaseClient from '../utils/firebaseClient'
import I18n from '../utils/i18n'

import * as LoginDialogActions from '../actions/loginDialog'

const styles = {
  alignCenter: {
    textAlign: 'center',
  },
  buttonStyle: {
    margin: '0 0.5em'
  },
  hintText: {
    width: '100%',
    textAlign: 'center',
  },
  textField: {
    paddingTop: '2em',
    width: '100%',
  },
}

class LoginDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open && this.loginButton && !this.recaptchaVerifier) {
      this.recaptchaVerifier = FirebaseClient.createRecaptchaVerifier('login-button')
    }
    if (prevProps.step > this.props.step) {
      this.recaptchaVerifier.clear()
      this.recaptchaVerifier = null
    }
  }

  changePhoneNumber = (event, value) => {
    if (value.length > 11) { return }

    this.props.actions.changePhoneNumber(value)
  }

  changeConfirmCode = (event, value) => {
    if (value.length > 10) { return }

    this.props.actions.changeConfirmCode(value)
  }

  sendPhoneNumber = (e) => {
    e.preventDefault()

    let phone = this.props.phoneNumber.trim()

    if (!phone) {
      return
    }

    this.props.actions.sendPhoneNumber(phone, this.recaptchaVerifier)
  }

  sendConfirmCode = (e) => {
    e.preventDefault()

    let code = this.props.confirmCode.trim()

    if (!code) {
      return
    }

    this.props.actions.sendConfirmCode(code)
  }

  goBack = (e) => {
    e.preventDefault()

    this.props.actions.goBack()
  }

  goCancel = (e) => {
    e.preventDefault()

    this.props.actions.goCancel()
  }

  render() {

    const loginActions = [
      <RaisedButton
        id='login-button'
        label={ I18n.t(this.props.intl, 'loginDialog.login') }
        primary={ true }
        style={ styles.buttonStyle }
        onTouchTap={ this.sendPhoneNumber }
        ref={el => this.loginButton = el}
        disabled={ this.props.phoneNumber.length < 10 || this.props.isLoading }
      />,
      <FlatButton
        label={ I18n.t(this.props.intl, 'loginDialog.cancel') }
        style={ styles.buttonStyle }
        onTouchTap={ this.goCancel }
        disabled={ this.props.isLoading }
      />
    ]

    const confirmActions = [
      <RaisedButton
        label={ I18n.t(this.props.intl, 'loginDialog.send') }
        primary={ true }
        style={ styles.buttonStyle }
        onTouchTap={ this.sendConfirmCode }
        disabled={ this.props.confirmCode.length < 1 || this.props.isLoading }
      />,
      <FlatButton
        label={ I18n.t(this.props.intl, 'loginDialog.back') }
        style={ styles.buttonStyle }
        onTouchTap={ this.goBack }
        disabled={ this.props.isLoading }
      />
    ]

    const msgFailed =
      <div style={{color: this.props.muiTheme.palette.accent1Color }}>
        <FormattedHTMLMessage
          id='loginDialog.loginFailed'
          defaultMessage='Login failed.'
        />
      </div>

    const phoneForm =
      <div>
        { this.props.isFailed ?  msgFailed : '' }
        <FormattedHTMLMessage
          id='loginDialog.enterPhoneNumber'
          defaultMessage='Enter your phone number to log in.'
        />
        <TextField
          hintText={ I18n.t(this.props.intl, 'loginDialog.phoneNumber') }
          errorText={ this.props.phoneErrorText }
          value={ this.props.phoneNumber }
          onChange={ this.changePhoneNumber }
          style={ styles.textField }
          inputStyle={ styles.alignCenter }
          hintStyle={ styles.hintText }
          disabled={ this.props.isLoading }
          autoFocus
        />
      </div>

    const confirmForm =
      <div>
        <FormattedHTMLMessage
          id='loginDialog.enterConfCode'
          defaultMessage='A confirmation code was sent to your mobile device.<br/>Enter it in the field below.'
        />
        <TextField
          hintText={ I18n.t(this.props.intl, 'loginDialog.confCode') }
          value={ this.props.confirmCode }
          onChange={ this.changeConfirmCode }
          style={ styles.textField }
          inputStyle={ styles.alignCenter }
          hintStyle={ styles.hintText }
          disabled={ this.props.isLoading }
        />
      </div>

    return (
      <Dialog
        actions={ this.props.step === 0 ? loginActions : confirmActions }
        modal={ true }
        open={ this.props.open }
        contentStyle={ styles.alignCenter }
        actionsContainerStyle={ styles.alignCenter }
      >
        <Spinner top={ 40 } isLoading={ this.props.isLoading } />
        { this.props.step === 0 ? phoneForm : confirmForm }
      </Dialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    phoneNumber: state.loginDialog.phoneNumber,
    phoneErrorText: state.loginDialog.phoneErrorText,
    confirmCode: state.loginDialog.confirmCode,
    step: state.loginDialog.step,
    isFailed: state.loginDialog.isFailed,
    isLoading: state.loginDialog.isLoading,
    intl: state.intl,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginDialogActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(LoginDialog))
