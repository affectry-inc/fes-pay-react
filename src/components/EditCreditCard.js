import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class EditCreditCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cardNo: '',
      cardNoErrorText: '',
      month: '',
      year: '',
      securityCode: '',
      valid: false
    }
  }

  // TODO: Validate関数にする

  submitCreditCard = (e) => {
    e.preventDefault()

    const { cardNo, cardNoErrorText, month, year, securityCode } = this.state

    if (!cardNo || cardNo.length < 14 || cardNoErrorText || !month || !year || !securityCode) {
      return
    }

    this.props.onTouchGoNext(cardNo.slice(-4))

    this.setState({
      cardNo: '',
      cardNoErrorText: '',
      month: '',
      year: '',
      securityCode: '',
      valid: false
    })
  }

  changeCardNo = (event, value) => {
    let errorText = '';

    if (!/^\d*$/.test(value)){errorText='不正な文字が含まれています'}

    this.setState({
      cardNo: value,
      cardNoErrorText: errorText,
      valid: this.isValid(),
    })
  }

  changeMonth = (event, index, value) => {
    this.setState({
      month: value,
      valid: this.isValid(),
    })
  }

  changeYear = (event, index, value) => {
    this.setState({
      year: value,
      valid: this.isValid(),
    })
  }

  changeSecurityCode = (event, value) => {
    this.setState({
      securityCode: value,
      valid: this.isValid(),
    })
  }

  isValid = () => {
    const { cardNo, cardNoErrorText, month, year, securityCode } = this.state
    return (cardNo && cardNo.length >= 14 && !cardNoErrorText && month && year && securityCode)
  }

  render() {
    let months = [];
    let years = [];

    for (let i = 1; i <= 12; i++){
      let month = ('0' + i).slice(-2);
      months.push(<MenuItem key={i} value={month} primaryText={month} />);
    }

    for (let i = 2017; i <= 2027; i++){
      years.push(<MenuItem key={i} value={i} primaryText={i} />);
    }

    const { cardNo, cardNoErrorText, month, year, securityCode, valid } = this.state

    return (
      <div className='edit-credit-card'>
        <form onSubmit={this.submitCreditCard}>
          <TextField
            hintText='カード番号'
            errorText={cardNoErrorText}
            value={cardNo}
            onChange={this.changeCardNo}
          />
          <br/>
          <SelectField
            floatingLabelText='有効期限'
            floatingLabelFixed={true}
            hintText='月'
            value={month}
            onChange={this.changeMonth}
            style={{width: '120px'}}
          >
            {months}
          </SelectField>
          <SelectField
            floatingLabelText=' '
            floatingLabelFixed={true}
            hintText='年'
            value={year}
            onChange={this.changeYear}
            style={{width: '120px', marginLeft: '16px'}}
          >
            {years}
          </SelectField>
          <br/>
          <TextField
            hintText='セキュリティコード'
            value={securityCode}
            onChange={this.changeSecurityCode}
          />
          <br/>
          <RaisedButton label='次へ'
            type='submit'
            disabled={!valid}
            primary={true}
          >
          </RaisedButton>
        </form>
      </div>
    )
  }
}

EditCreditCard.propTypes = {
  onTouchGoNext: PropTypes.func.isRequired,
}

export default EditCreditCard;
