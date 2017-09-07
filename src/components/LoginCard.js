import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'

import I18n from '../utils/i18n'

import * as AppActions from '../actions/app'

class LoginCard extends Component {

  render() {

    return (
      <Grid>
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
                  label={ I18n.t(this.props.intl, 'history.login') }
                  primary={ true }
                  onTouchTap={ this.props.actions.openLogin }
                />
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCard)
