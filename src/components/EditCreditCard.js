import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12
  }
};

class EditCreditCard extends Component {

  constructor(props) {
    super(props);

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
    if (!this.state.cardNo || this.state.cardNoErrorText || !this.state.month|| !this.state.year || !this.state.securityCode) {
      return
    }
    alert('Credit saved');
    this.setState({
      cardNo: '',
      cardNoErrorText: '',
      month: '',
      year: '',
      securityCode: '',
    })
  }

  changeCardNo = (event, value) => {
    let errorText = '';
    if (!/^[\d\-]*$/.test(value)){errorText='不正な文字が含まれています'}
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
    let months = [];
    let years = [];

    for (let i = 1; i <= 12; i++){
      let month = ('0' + i).slice(-2);
      months.push(<MenuItem value={month} primaryText={month} />);
    }

    for (let i = 2017; i <= 2027; i++){
      years.push(<MenuItem value={i} primaryText={i} />);
    }

    return (
      <div className='edit-credit-card'>
        <form onSubmit={this.submitCreditCard}>
          <TextField
            hintText='カード番号'
            errorText={this.state.cardNoErrorText}
            value={this.state.cardNo}
            onChange={this.changeCardNo}
          />
          <br/>
          <SelectField
            floatingLabelText='有効期限'
            floatingLabelFixed={true}
            hintText='月'
            value={this.state.month}
            onChange={this.changeMonth}
            style={{width: '120px'}}
          >
            {months}
          </SelectField>
          <SelectField
            floatingLabelText=' '
            floatingLabelFixed={true}
            hintText='年'
            value={this.state.year}
            onChange={this.changeYear}
            style={{width: '120px', marginLeft: '16px'}}
          >
            {years}
          </SelectField>
          <br/>
          <TextField
            hintText='セキュリティコード'
            value={this.state.securityCode}
            onChange={this.changeSecurityCode}
          />
          <br/>
          <RaisedButton label='次へ'
            type='submit'
            disabled={!this.state.cardNo || this.state.cardNoErrorText || !this.state.month|| !this.state.year || !this.state.securityCode}
            style={styles.button}
            primary={true}>
          </RaisedButton>
        </form>
      </div>
    )
  }
}

export default EditCreditCard;
