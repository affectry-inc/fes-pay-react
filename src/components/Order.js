import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedHTMLMessage } from 'react-intl'

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
  }
}

class Order extends Component {
  render(){
    const { paidAt, tenantName, amount, amountCard, amountCoupon, cardLastDigits } = this.props

    let cardDetails, couponDetails
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

    return(
      <Row style={ styles.order }>
        <Col xs={ 12 }>
          <Card>
            <CardHeader
              title={ paidAt }
              subtitle={
                <Row>
                  <Col xs={ 8 } style={ styles.tenantName }>
                    <span>{ tenantName }</span>
                  </Col>
                  <Col xs={ 4 } style={ styles.amount }>
                    <span>&yen; { amount.toLocaleString() }</span>
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
  cardLastDigits: PropTypes.number.isRequired,
}

export default Order
