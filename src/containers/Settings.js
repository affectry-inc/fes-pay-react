import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'
import { FormattedHTMLMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'

import Spinner from '../components/Spinner'
import LoginCard from '../components/LoginCard'

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

  render() {
    const { isPrivileged, couponBalance, dispCardNo, dispPhotoUrl, dispPhoneNumber, isLoading } = this.props

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
    isPrivileged: state.settings.isPrivileged,
    couponBalance: state.settings.couponBalance,
    dispCardNo: state.settings.dispCardNo,
    dispPhotoUrl: state.settings.dispPhotoUrl,
    dispPhoneNumber: state.settings.dispPhoneNumber,
    isLoading: state.history.isLoading,
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
