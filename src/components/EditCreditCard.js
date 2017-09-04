import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import * as EditCreditCardActions from '../actions/editCreditCard'
import I18n from '../utils/i18n'

import Spinner from '../components/Spinner'

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

    this.months = []
    this.years = []

    for (let i = 1; i <= 12; i++){
      let month = ('0' + i).slice(-2)
      this.months.push(<MenuItem key={ i } value={ month } primaryText={ month } />)
    }

    for (let i = 2017; i <= 2027; i++){
      this.years.push(<MenuItem key={ i } value={ i } primaryText={ i } />)
    }
  }

  componentWillUnmount() {
    this.props.actions.clearAll()
  }

  submitCreditCard = (e) => {
    e.preventDefault()

    const { bandId, card } = this.props

    if (!card) {
      return
    }

    this.props.onTouchGoNext(bandId, card)
  }

  skipCreditCard = (e) => {
    e.preventDefault()

    const { bandId } = this.props

    this.props.onTouchSkip(bandId)
  }

  changeCardNo = (event, value) => {
    this.props.actions.changeCardNo(value)
  }

  changeMonth = (event, index, value) => {
    this.props.actions.changeMonth(value)
  }

  changeYear = (event, index, value) => {
    this.props.actions.changeYear(value)
  }

  changeSecurityCode = (event, value) => {
    this.props.actions.changeSecurityCode(value)
  }

  render() {
    const { cardNo, cardNoErrorText, month, year, securityCode, card, intl, isLoading } = this.props

    return (
      <Row className='edit-credit-card' start='xs'>
        <Spinner top={ 80 } isLoading={ isLoading } />
        <Col xs={ 12 }>
          <form onSubmit={ this.submitCreditCard }>
            <Row>
              <Col xs={ 12 }>
                <TextField
                  hintText={ I18n.t(intl, 'editCreditCard.cardNo') }
                  errorText={ cardNoErrorText }
                  value={ cardNo }
                  onChange={ this.changeCardNo }
                  style={ styles.fullWidth }
                  disabled={ isLoading }
                />
              </Col>
            </Row>
            <Row>
              <Col xs={ 6 }>
                <SelectField
                  floatingLabelText={ I18n.t(intl, 'editCreditCard.expiration') }
                  floatingLabelFixed={ true }
                  hintText={ I18n.t(intl, 'editCreditCard.month') }
                  value={ month }
                  onChange={ this.changeMonth }
                  style={ styles.fullWidth }
                  disabled={ isLoading }
                >
                  { this.months }
                </SelectField>
              </Col>
              <Col xs={ 6 }>
                <SelectField
                  floatingLabelText=' '
                  floatingLabelFixed={ true }
                  hintText={ I18n.t(intl, 'editCreditCard.year') }
                  value={ year }
                  onChange={ this.changeYear }
                  style={ styles.fullWidth }
                  disabled={ isLoading }
                >
                  { this.years }
                </SelectField>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <TextField
                  hintText={ I18n.t(intl, 'editCreditCard.securityCode') }
                  value={ securityCode }
                  onChange={ this.changeSecurityCode }
                  style={ styles.fullWidth }
                  disabled={ isLoading }
                />
              </Col>
            </Row>
            <Row style={ styles.buttons }>
              <Col xs={ 6 }>
                <RaisedButton label={ I18n.t(intl, 'editCreditCard.next') }
                  type='submit'
                  disabled={ !card || isLoading }
                  primary={ true }
                  style={ styles.fullWidth }
                >
                </RaisedButton>
              </Col>
              <Col xs={ 6 }>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

EditCreditCard.propTypes = {
  bandId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onTouchGoNext: PropTypes.func.isRequired,
  onTouchSkip: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    cardNo: state.editCreditCard.cardNo,
    cardNoErrorText: state.editCreditCard.cardNoErrorText,
    month: state.editCreditCard.month,
    year: state.editCreditCard.year,
    securityCode: state.editCreditCard.securityCode,
    card: state.editCreditCard.card,
    intl: state.intl,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EditCreditCardActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCreditCard)
