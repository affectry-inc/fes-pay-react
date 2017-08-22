import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'

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
            <h2>
              {process.env.REACT_APP_ABC}
              {process.env.NODE_ENV}
            </h2>
          </Col>
        </Row>
      </Grid>
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
