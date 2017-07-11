import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const styles = {
  alignCenter: {
    textAlign: 'center',
  },
  hintText: {
    width: '100%',
    textAlign: 'center',
  },
  textField: {
    paddingTop: '2em',
    width: '100%',
  }
}

class ConfirmCodeDialog extends Component {

  static propTypes = {
    onTouchSend: PropTypes.func.isRequired,
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

    this.props.onTouchSend(this.state.confirmCode)

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
      <FlatButton
        label='送信'
        primary={ true }
        onTouchTap={ this.sendConfirmCode }
      />,
    ]

    return (
      <Dialog
        actions={ actions }
        modal={ true }
        open={ this.props.open }
        contentStyle={ styles.alignCenter }
        actionsContainerStyle={ styles.alignCenter }
      >
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
        />
      </Dialog>
    )
  }
}

export default ConfirmCodeDialog
