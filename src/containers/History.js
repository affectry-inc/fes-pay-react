import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { Paper } from 'material-ui'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import Order from '../components/Order'
import I18n from '../utils/i18n'

import * as HistoryActions from '../actions/history'

const styles = {
  summary: {
    margin: '10px 30px',
    padding: '10px 20px',
    fontSize: '1.3em'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
}

class History extends Component {

  componentDidMount() {
    const { actions } = this.props
    actions.listenLogin(this.props.params.bandId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.bandId !== this.props.params.bandId) {
      const { actions } = this.props
      actions.loadOrders(nextProps.params.bandId)
    }
  }

  render() {
    const { isPrivileged, orders, totalAmount, intl } = this.props
    const { actions } = this.props

    let list = []
    orders.map(order => {
      return list.push(
        <Order
          key={ order.key }
          paidAt={ order.paidAt }
          tenantName={ order.tenantName }
          amount={ order.amount }
          amountCard={ order.amountCard }
          amountCoupon={ order.amountCoupon }
          cardLastDigits={ order.cardLastDigits }
        />
      )
    })

    let loginCard =
      <Row center='xs'>
        <Col xs={ 8 }>
          <Card style={{ textAlign: 'center' }} >
            <CardText>
              <FormattedMessage
                id='history.noPrivilege'
                defaultMessage='You have no privilege to access this page.'
              />
            </CardText>
            <CardActions>
              <FlatButton
                label={ I18n.t(intl, 'history.login') }
                primary={ true }
                onTouchTap={ actions.login }
              />
            </CardActions>
          </Card>
        </Col>
      </Row>

    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>
              <FormattedMessage
                id='history.history'
                defaultMessage='Your Orders'
              />
            </h2>
          </Col>
        </Row>
        <Summary totalAmount={ totalAmount } />
        { isPrivileged ? '' : loginCard }
        { list }
      </Grid>
    )
  }
}

class Summary extends Component {
  render() {
    const { totalAmount } = this.props
    return (
      <Paper style={ styles.summary } zDepth={ 0 }>
        <Row center='xs' >
          <Col xs={ 6 } style={ styles.textLeft }>
            <FormattedMessage
              id='history.total'
              defaultMessage='Total'
            />
          </Col>
          <Col xs={ 6 } style={ styles.textRight }>
            <span>&yen; { totalAmount.toLocaleString() }</span>
          </Col>
        </Row>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPrivileged: state.history.isPrivileged,
    orders: state.history.orders ? state.history.orders : [],
    totalAmount: state.history.totalAmount,
    app: state.app,
    intl: state.intl,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HistoryActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
