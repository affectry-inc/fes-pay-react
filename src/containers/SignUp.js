import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import { Grid, Row, Col } from 'react-flexbox-grid'

import EditCreditCard from '../components/EditCreditCard'
import EditFacePhoto from '../components/EditFacePhoto'
import EditPhoneNumber from '../components/EditPhoneNumber'
import FinishedStepContent from '../components/FinishedStepContent'

import * as SignUpActions from '../actions/signUp'

const styles = {
  stepContent: {
    paddingTop: '16px'
  }
}

class SignUp extends Component {

  render() {
    const { stepIndex, dispCardNo, dispPhotoUrl, actions } = this.props

    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>FesPayへようこそ！</h2>
          </Col>
        </Row>
        <Row center='xs'>
          <Col xs={ 12 } sm={ 8 } md={ 6 }>
            <Stepper activeStep={ stepIndex } orientation="vertical">
              <Step>
                <StepLabel>クレジットカード登録</StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditCreditCard
                    bandId={ this.props.params.bandId }
                    onTouchGoNext={ actions.saveCreditCard }
                  />
                </StepContent>
                <FinishedStepContent text={ dispCardNo } />
              </Step>
              <Step>
                <StepLabel>顔写真</StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditFacePhoto
                    bandId={ this.props.params.bandId }
                    onTouchGoNext={ actions.saveFacePhoto }
                    onTouchGoPrev={ actions.resetCreditCard }
                  />
                </StepContent>
                <FinishedStepContent imageUrl={ dispPhotoUrl }/>
              </Step>
              <Step>
                <StepLabel>携帯電話番号</StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditPhoneNumber
                    bandId={ this.props.params.bandId }
                    onTouchGoPrev={ actions.resetFacePhoto }
                  />
                </StepContent>
              </Step>
            </Stepper>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    stepIndex: state.signUp.stepIndex,
    dispCardNo: state.signUp.dispCardNo,
    dispPhotoUrl: state.signUp.dispPhotoUrl,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
