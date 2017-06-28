import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  fullWidth: {
    width: '100%'
  },
  buttons: {
    marginTop: '16px'
  }
}

class EditCreditCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cardNo: '',
      cardNoErrorText: '',
      month: '',
      year: '',
      securityCode: '',
    }
  }

  submitCreditCard = (e) => {
    e.preventDefault()

    // eslint-disable-next-line
    const { cardNo, cardNoErrorText, month, year, securityCode } = this.state

    // TODO: Remove commentout on production
    // if (!cardNo || cardNo.length < 1 || cardNoErrorText || !month || !year || !securityCode) {
    //   return
    // }

    // this.props.onTouchGoNext(cardNo.slice(-4))
    this.props.onTouchGoNext(this.state)

    this.setState({
      cardNo: '',
      cardNoErrorText: '',
      month: '',
      year: '',
      securityCode: '',
    })
  }

  changeCardNo = (event, value) => {
    let errorText = ''

    if (!/^\d*$/.test(value)){errorText='不正な文字が含まれています'}

    this.setState({
      cardNo: value,
      cardNoErrorText: errorText,
    })
  }

  changeMonth = (event, index, value) => {
    this.setState({
      month: value,
    })
  }

  changeYear = (event, index, value) => {
    this.setState({
      year: value,
    })
  }

  changeSecurityCode = (event, value) => {
    this.setState({
      securityCode: value,
    })
  }

  render() {
    let months = []
    let years = []

    for (let i = 1; i <= 12; i++){
      let month = ('0' + i).slice(-2)
      months.push(<MenuItem key={i} value={month} primaryText={month} />)
    }

    for (let i = 2017; i <= 2027; i++){
      years.push(<MenuItem key={i} value={i} primaryText={i} />)
    }

    const { cardNo, cardNoErrorText, month, year, securityCode } = this.state

    return (
      <Row className='edit-credit-card' start='xs'>
        <Col xs={12}>
          <form onSubmit={this.submitCreditCard}>
            <Row>
              <Col xs={12}>
                <TextField
                  hintText='カード番号'
                  errorText={cardNoErrorText}
                  value={cardNo}
                  onChange={this.changeCardNo}
                  style={styles.fullWidth}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <SelectField
                  floatingLabelText='有効期限'
                  floatingLabelFixed={true}
                  hintText='月'
                  value={month}
                  onChange={this.changeMonth}
                  style={styles.fullWidth}
                >
                  {months}
                </SelectField>
              </Col>
              <Col xs={6}>
                <SelectField
                  floatingLabelText=' '
                  floatingLabelFixed={true}
                  hintText='年'
                  value={year}
                  onChange={this.changeYear}
                  style={styles.fullWidth}
                >
                  {years}
                </SelectField>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextField
                  hintText='セキュリティコード'
                  value={securityCode}
                  onChange={this.changeSecurityCode}
                  style={styles.fullWidth}
                />
              </Col>
            </Row>
            <Row style={styles.buttons}>
              <Col xs={6}>
                <RaisedButton label='次へ'
                  type='submit'
                  // TODO: Remove commentout on production
                  // disabled={(!cardNo || cardNo.length < 1 || cardNoErrorText || !month || !year || !securityCode)}
                  primary={true}
                  style={styles.fullWidth}
                >
                </RaisedButton>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

EditCreditCard.propTypes = {
  onTouchGoNext: PropTypes.func.isRequired,
}

export default EditCreditCard
