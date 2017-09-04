import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import Spinner from '../components/Spinner'

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

class ConfirmCodeDialog extends Component {

  static propTypes = {
    bandId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onTouchSend: PropTypes.func.isRequired,
    onTouchGoPrev: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmCode: '',
    }
  }

  sendConfirmCode = (e) => {
    e.preventDefault()

    if (!this.state.confirmCode.trim()) {
      return
    }

    this.props.onTouchSend(this.state.confirmCode, this.props.bandId)
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()

    this.setState({
      confirmCode: '',
    })
  }

  changeConfirmCode = (event, value) => {
    this.setState({
      confirmCode: value,
    })
  }

  render() {
    const actions = [
      <RaisedButton
        label='送信'
        primary={ true }
        style={ styles.buttonStyle }
        onTouchTap={ this.sendConfirmCode }
        disabled={ this.props.isLoading }
      />,
      <FlatButton
        label="戻る"
        style={ styles.buttonStyle }
        onTouchTap={ this.goBack }
        disabled={ this.props.isLoading }
      />
    ]

    return (
      <Dialog
        actions={ actions }
        modal={ true }
        open={ this.props.open }
        contentStyle={ styles.alignCenter }
        actionsContainerStyle={ styles.alignCenter }
      >
        <Spinner top={ 40 } isLoading={ this.props.isLoading } />
        <span>
          ご登録いただいた電話番号にSMSを送信しました。<br/>
          本文に記載されている確認コードを入力してください。
        </span>
        <TextField
          hintText='確認コード'
          value={ this.state.confirmCode }
          onChange={ this.changeConfirmCode }
          style={ styles.textField }
          inputStyle={ styles.alignCenter }
          hintStyle={ styles.hintText }
          disabled={ this.props.isLoading }
        />
      </Dialog>
    )
  }
}

export default ConfirmCodeDialog
