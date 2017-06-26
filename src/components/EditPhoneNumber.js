import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

class EditPhoneNumber extends Component {

  constructor(props) {
    super(props)

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

    alert('Phone saved')

    this.setState({
      phoneNumber: '',
      phoneNumberErrorText: '',
    })
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoneNumber = (event, value) => {
    let errorText = ''
    if (!/^\d*$/.test(value)){errorText='不正な文字が含まれています'}
    this.setState({
      phoneNumber: value,
      phoneNumberErrorText: errorText,
    })
  }

  render() {
    const { phoneNumber, phoneNumberErrorText } = this.state

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
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <RaisedButton
                  label='登録'
                  type='submit'
                  disabled={!phoneNumber || phoneNumber.length < 1 || phoneNumberErrorText.length > 0}
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
          <p>登録をもって、本サービス利用規約及びプライバシーポリシーに同意されたものとみなします。</p>
        </Col>
      </Row>
    )
  }
}

export default EditPhoneNumber
