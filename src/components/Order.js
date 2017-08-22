import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'

const styles = {
  order: {
    margin: '10px 30px',
    padding: '10px'
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
    const { datetime, tenantName, amount } = this.props

    return(
      <Row style={ styles.order }>
        <Col xs={ 12 }>
          <Row>
            <Col xs={ 12 }>
              <span>{ datetime }</span>
            </Col>
          </Row>
          <Row>
            <Col xs={ 8 } style={ styles.tenantName }>
              <span>{ tenantName }</span>
            </Col>
            <Col xs={ 4 } style={ styles.amount }>
              <span>&yen; { amount.toLocaleString() }</span>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

Order.propTypes = {
  datetime: PropTypes.string.isRequired,
  tenantName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}

export default Order
