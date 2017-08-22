import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { Paper } from 'material-ui'

import Order from '../components/Order'

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
  render() {
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
        <Summary amount={ 17000 } />
        <Order
          datetime='8/17 12:30'
          tenantName='でへへ本舗'
          amount={ 1000 }
        />
      </Grid>
    )
  }
}

class Summary extends Component {
  render() {
    const { amount } = this.props
    return (
      <Paper style={ styles.summary } zDepth={1}>
        <Row center='xs' >
          <Col xs={ 6 } style={ styles.textLeft }>
            <span>総額</span>
          </Col>
          <Col xs={ 6 } style={ styles.textRight }>
            <span>&yen; { amount.toLocaleString() }</span>
          </Col>
        </Row>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
