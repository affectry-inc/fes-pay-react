import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedHTMLMessage } from 'react-intl'

import TimeUtil from '../utils/timeUtils'

const styles = {
  order: {
    margin: '10px 20px',
  },
  paidAt: {
    fontSize: '1em',
  },
  tenantName: {
    fontSize: '1.2em',
    marginTop: '0.8em'
  },
  amount: {
    fontSize: '1.2em',
    marginTop: '0.8em',
    paddingRight: '10px',
    textAlign: 'end'
  },
  strikeThrough: {
    textDecoration: 'line-through'
  },
}

class Order extends Component {
  render(){
    const { paidAt, tenantName, amount, amountCard, amountCoupon, cardLastDigits, isRefunded, refundedAt } = this.props

    let cardDetails, couponDetails, refundDetails
    cardDetails =
      <FormattedHTMLMessage
        id='order.amountCard'
        defaultMessage={'Credit card ({ cardLastDigits }): &yen; { amountCard, number }'}
        values={{ amountCard, cardLastDigits }}
      />

    if (amountCoupon) {
      couponDetails =
        <div>
          <FormattedHTMLMessage
            id='order.amountCoupon'
            defaultMessage={'Coupon: &yen; { amountCoupon, number }'}
            values={{ amountCoupon }}
          />
        </div>
    }

    if (isRefunded) {
      const refundedAtStr = TimeUtil.gmtToJst(refundedAt)
      refundDetails =
        <div>
          <FormattedHTMLMessage
            id='order.refundDetails'
            defaultMessage={'Refunded at: { refundedAt }'}
            values={{ refundedAt: refundedAtStr }}
          />
        </div>
    }

    return(
      <Row style={ styles.order }>
        <Col xs={ 12 }>
          <Card>
            <CardHeader
              title={ TimeUtil.gmtToJst(paidAt) }
              subtitle={
                <Row>
                  <Col xs={ 8 } style={ styles.tenantName }>
                    <span>{ tenantName }</span>
                  </Col>
                  <Col xs={ 4 } style={ styles.amount }>
                    <span style={ isRefunded && styles.strikeThrough }>
                      &yen; { amount.toLocaleString() }
                    </span>
                  </Col>
                </Row>
              }
              textStyle={{ width: '100%' }}
              titleStyle={ styles.paidAt }
              subtitleStyle={ styles.tenantName }
              actAsExpander={true}
              showExpandableButton={ false }
            />
            <CardText expandable={true}>
              <FormattedHTMLMessage
                id='order.details'
                defaultMessage='<Details>'
              />
              <div style={{ marginLeft: '10px' }}>
                { cardDetails }
                { couponDetails }
                { refundDetails }
              </div>
            </CardText>
          </Card>
        </Col>
      </Row>
    )
  }
}

Order.propTypes = {
  paidAt: PropTypes.string.isRequired,
  tenantName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  amountCard: PropTypes.number.isRequired,
  amountCoupon: PropTypes.number,
  cardLastDigits: PropTypes.string.isRequired,
  isRefunded: PropTypes.bool,
  refundedAt: PropTypes.string,
}

export default Order
