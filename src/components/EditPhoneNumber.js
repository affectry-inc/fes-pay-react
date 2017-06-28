import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'

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

  constructor(props) {
    super(props)

    this.state = {
      phoneNumber: '',
      phoneNumberErrorText: '',
      isTermsAgreed: false
    }
  }

  componentDidMount() {
    this.phoneNumber.focus()
  }

  submitPhoneNumber = (e) => {
    e.preventDefault()

    const { phoneNumber, phoneNumberErrorText, isTermsAgreed } = this.state

    if (!phoneNumber || phoneNumber.length < 1 || phoneNumberErrorText || !isTermsAgreed) {
      return
    }

    alert('Phone saved')

    this.setState({
      phoneNumber: '',
      phoneNumberErrorText: '',
      isTermsAgreed: false
    })
  }

  goBack = (e) => {
    this.props.onTouchGoPrev()
  }

  changePhoneNumber = (event, value) => {
    let errorText = ''
    if (!/^\d*$/.test(value)) { errorText = '不正な文字が含まれています' }
    this.setState({
      phoneNumber: value,
      phoneNumberErrorText: errorText,
    })
  }

  checkTermsAgreed = (event, isInputChecked) => {
    this.setState({
      isTermsAgreed: isInputChecked,
    })
  }

  render() {
    const { phoneNumber, phoneNumberErrorText, isTermsAgreed } = this.state

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
            <Row style={styles.buttons}>
              <Col xs={6}>
                <RaisedButton
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

export default EditPhoneNumber
