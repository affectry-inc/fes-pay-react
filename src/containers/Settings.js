import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { FormattedHTMLMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import Spinner from '../components/Spinner'
import LoginCard from '../components/LoginCard'
import I18n from '../utils/i18n'

import * as SettingsActions from '../actions/settings'

const styles = {
  setting: {
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
  alignCenter: {
    textAlign: 'center',
  },
  buttonStyle: {
    margin: '0 0.5em'
  },
}

class Settings extends Component {

  componentDidMount() {
    const { actions } = this.props
    actions.listenLogin(this.props.params.bandId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.bandId !== this.props.params.bandId) {
      const { actions } = this.props
      actions.loadSettings(nextProps.params.bandId)
    }
  }

  resetSettings = (e) => {
    this.props.actions.resetSettings(this.props.params.bandId)
  }

  render() {
    const { actions, isPrivileged, couponBalance, dispCardNo, dispPhotoUrl, dispPhoneNumber, isLoading, openResetDialog, isReset, intl } = this.props

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

    let settingPanels =
      <div>
        { couponBalanceEl }
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.creditCardTitle'
              defaultMessage='Credit Card'
            />
          }
          isReset={ isReset }
          text={ dispCardNo }
        />
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.facePhotoTitle'
              defaultMessage='Face Photo'
            />
          }
          isReset={ isReset }
          imageUrl={ dispPhotoUrl }
        />
        <SettingPanel
          title={
            <FormattedMessage
              id='settings.phoneNumberTitle'
              defaultMessage='Phone Number'
            />
          }
          text={ dispPhoneNumber }
        />
        <Row center='xs' style={ styles.setting }>
          <Col xs={ 6 }>
            <RaisedButton
              label={ I18n.t(intl, 'settings.reset') }
              primary={ true }
              style={{ width: '100%' }}
              onTouchTap={ actions.openResetDialog }
              disabled={ isReset }
            />
          </Col>
          <Dialog
            actions={[
              <RaisedButton
                label={ I18n.t(intl, 'settings.reset') }
                primary={ true }
                style={ styles.buttonStyle }
                onTouchTap={ this.resetSettings }
              />,
              <FlatButton
                label={ I18n.t(intl, 'settings.cancel') }
                style={ styles.buttonStyle }
                onTouchTap={ actions.closeResetDialog }
              />
            ]}
            modal={ true }
            open={ openResetDialog }
            contentStyle={ styles.alignCenter }
            actionsContainerStyle={ styles.alignCenter }
          >
            <FormattedHTMLMessage
              id='settings.sureToReset'
              defaultMessage='Your QR code will be deactivated.<br/>Are you sure to reset?'
            />
          </Dialog>
        </Row>
      </div>

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
        { isLoading ? <Spinner top={ 200 } isLoading={ isLoading } /> : isPrivileged ? settingPanels : <LoginCard /> }
      </Grid>
    )
  }
}

class SettingPanel extends Component {
  render() {
    const { title, text, imageUrl, isReset } = this.props

    return (
      <Row style={ styles.setting }>
        <Col xs={ 12 }>
          <Row>
            <Col xs={ 12 } style={ styles.title }>
              { title }
            </Col>
          </Row>
          <Row center='xs'>
            <Col xs={ 12 } style={ styles.content }>
              { isReset &&
                (<FormattedMessage
                  id='settings.isReset'
                  defaultMessage='-- Not registered --'
                />)
              }
              { !isReset && text && (<span>{text}</span>) }
              { !isReset && imageUrl && (<img src={ imageUrl } alt='' style={ styles.img }/>) }
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPrivileged: state.settings.isPrivileged,
    couponBalance: state.settings.couponBalance,
    dispCardNo: state.settings.dispCardNo,
    dispPhotoUrl: state.settings.dispPhotoUrl,
    dispPhoneNumber: state.settings.dispPhoneNumber,
    isLoading: state.settings.isLoading,
    openResetDialog: state.settings.openResetDialog,
    isReset: state.settings.isReset,
    intl: state.intl,
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
