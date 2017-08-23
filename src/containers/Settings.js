import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { FormattedHTMLMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'

import * as SettingsActions from '../actions/settings'

const styles = {
  setting: {
    // border: '1px solid #cccccc',
    margin: '40px 30px'
  },
  title: {
    fontSize: '1.2em',
    lineHeight: '36px'
  },
  content: {
    margin: '20px'
  },
  img: {
    width: '40%',
  },
}

class Settings extends Component {

  componentDidMount() {
    const { actions, bandId } = this.props
    actions.loadSettings(bandId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bandId !== this.props.bandId) {
      const { actions } = this.props
      actions.loadSettings(nextProps.bandId)
    }
  }

  render() {
    const { couponBalance, dispCardNo, dispPhotoUrl, dispPhoneNumber } = this.props
    let couponBalanceEl

    if (couponBalance) {
      couponBalanceEl =
        <Row style={ styles.setting }>
          <Col xs={ 12 }>
            <Row>
              <Col xs={ 12 } style={ styles.title }>
                <FormattedMessage
                  id='settings.couponBalanceTitle'
                  defaultMessage='Coupon Balance'
                />
              </Col>
            </Row>
            <Row center='xs'>
              <Col style={ styles.content }>
                <FormattedHTMLMessage
                  id='settings.couponBalanceVal'
                  defaultMessage={ '&yen; { couponBalance, number }' }
                  values={{ couponBalance }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
    }

    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>
              <FormattedMessage
                id='settings.settings'
                defaultMessage='Settings'
              />
            </h2>
          </Col>
        </Row>
        { couponBalanceEl }
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.creditCardTitle'
              defaultMessage='Credit Card'
            />
          }
          onEdit={ () => {console.log('hey')} }
          text={ dispCardNo }
        />
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.facePhotoTitle'
              defaultMessage='Face Photo'
            />
          }
          onEdit={ () => {console.log('hey')} }
          imageUrl={ dispPhotoUrl }
        />
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.phoneNumberTitle'
              defaultMessage='Phone Number'
            />
          }
          onEdit={ () => {console.log('hey')} }
          text={ dispPhoneNumber }
        />
      </Grid>
    )
  }
}

class SettingPanel extends Component {
  render() {
    const { title, onEdit, text, imageUrl } = this.props;

    const editLabel =
      <FormattedMessage
        id='settings.edit'
        defaultMessage='Edit'
      />

    return (
      <Row style={ styles.setting }>
        <Col xs={ 12 }>
          <Row>
            <Col xs={ 9 } style={ styles.title }>
              { title }
            </Col>
            <Col xs={ 3 }>
              <FlatButton label={ editLabel }
                primary={ true }
                style={{ minWidth: '0px' }}
                labelStyle={{ padding: '0px' }}
                onClick={ onEdit }
              />
            </Col>
          </Row>
          <Row center='xs'>
            <Col xs={ 12 } style={ styles.content }>
              { text && (<span>{text}</span>) }
              { imageUrl && (<img src={ imageUrl } alt='' style={ styles.img }/>) }
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    couponBalance: state.settings.couponBalance,
    dispCardNo: state.settings.dispCardNo,
    dispPhotoUrl: state.settings.dispPhotoUrl,
    dispPhoneNumber: state.settings.dispPhoneNumber,
    bandId: state.app.bandId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SettingsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
