import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { Paper } from 'material-ui'

import Order from '../components/Order'

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
    const { actions, bandId } = this.props
    actions.loadOrders(bandId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bandId !== this.props.bandId) {
      const { actions } = this.props
      actions.loadOrders(nextProps.bandId)
    }
  }

  render() {
    const { orders, totalAmount } = this.props

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
            <span>総額</span>
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
    orders: state.history.orders ? state.history.orders : [],
    totalAmount: state.history.totalAmount,
    bandId: state.app.bandId,
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
