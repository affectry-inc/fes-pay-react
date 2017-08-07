import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

class ComAct extends Component {
  render() {
    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>
              <FormattedMessage
                id='comAct.comAct'
                defaultMessage='Notices required by Act on Specified Commercial Transactions'
              />
            </h2>
          </Col>
        </Row>
        <Row center='xs'>
          <Col xsOffset={ 1 } xs={ 10 } sm={ 8 } md={ 6 }>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.companyKey'
                    defaultMessage='Company'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.companyVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.representativeKey'
                    defaultMessage='Representative'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.representativeVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.locationKey'
                    defaultMessage='Location'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedHTMLMessage
                    id='comAct.locationVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.contactKey'
                    defaultMessage='Contact'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedHTMLMessage
                    id='comAct.contactVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.websiteKey'
                    defaultMessage='Website'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedHTMLMessage
                    id='comAct.websiteVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.priceKey'
                    defaultMessage='Price'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.priceVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.expensesKey'
                    defaultMessage='Other Expsnses'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.expensesVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.deliveryKey'
                    defaultMessage='Time of Delivery'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.deliveryVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.paymentKey'
                    defaultMessage='Payment Method'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.paymentVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>
                  <FormattedMessage
                    id='comAct.returnKey'
                    defaultMessage='Return & Change'
                  />
                </p>
              </Col>
              <Col xs={ 8 }>
                <p>
                  <FormattedMessage
                    id='comAct.returnVal'
                    defaultMessage='----------'
                  />
                </p>
              </Col>
            </Row>
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
)(ComAct)
