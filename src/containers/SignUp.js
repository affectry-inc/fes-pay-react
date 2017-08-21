import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { FormattedMessage } from 'react-intl'

import EditCreditCard from '../components/EditCreditCard'
import EditFacePhoto from '../components/EditFacePhoto'
import EditPhoneNumber from '../components/EditPhoneNumber'
import FinishedStepContent from '../components/FinishedStepContent'
import ConfirmCodeDialog from '../components/ConfirmCodeDialog'

import * as SignUpActions from '../actions/signUp'

const styles = {
  stepContent: {
    paddingTop: '16px'
  }
}

class SignUp extends Component {

  render() {
    const { stepIndex, dispCardNo, dispPhotoUrl, dispPhoneNumber, actions, confirmCodeDialogOpen, bandId } = this.props

    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>
              <FormattedMessage
                id='signUp.welcomeToFesPay'
                defaultMessage='Welcome to FesPay!!'
              />
            </h2>
          </Col>
        </Row>
        <Row center='xs'>
          <Col xs={ 12 } sm={ 8 } md={ 6 }>
            <Stepper activeStep={ stepIndex } orientation='vertical'>
              <Step>
                <StepLabel>
                  <FormattedMessage
                    id='signUp.registerCreditCard'
                    defaultMessage='Credit Card'
                  />
                </StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditCreditCard
                    bandId={ bandId }
                    onTouchGoNext={ actions.saveCreditCard }
                    onTouchSkip={ actions.skipCreditCard }
                  />
                </StepContent>
                <FinishedStepContent text={ dispCardNo } hide={ stepIndex === 0 } />
              </Step>
              <Step>
                <StepLabel>
                  <FormattedMessage
                    id='signUp.registerFacePhoto'
                    defaultMessage='Face Photo'
                  />
                </StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditFacePhoto
                    bandId={ bandId }
                    onTouchGoNext={ actions.saveFacePhoto }
                    onTouchGoPrev={ actions.backToCreditCard }
                  />
                </StepContent>
                <FinishedStepContent imageUrl={ dispPhotoUrl } hide={ stepIndex === 1 } />
              </Step>
              <Step>
                <StepLabel>
                  <FormattedMessage
                    id='signUp.registerPhoneNumber'
                    defaultMessage='Phone Number'
                  />
                </StepLabel>
                <StepContent style={ styles.stepContent }>
                  <EditPhoneNumber
                    bandId={ bandId }
                    onTouchSignUp={ actions.register }
                    onTouchGoPrev={ actions.backToFacePhoto }
                  />
                </StepContent>
                <FinishedStepContent text={ dispPhoneNumber } hide={ stepIndex === 2 } />
              </Step>
            </Stepper>
          </Col>
        </Row>
        <ConfirmCodeDialog
          onTouchSend={ actions.sendConfirmCode }
          onTouchGoPrev={ actions.backToPhoneNumber }
          open={ confirmCodeDialogOpen }
        />
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    stepIndex: state.signUp.stepIndex,
    dispCardNo: state.signUp.dispCardNo,
    dispPhotoUrl: state.signUp.dispPhotoUrl,
    dispPhoneNumber: state.signUp.dispPhoneNumber,
    confirmCodeDialogOpen: state.signUp.confirmCodeDialogOpen,
    bandId: state.app.bandId,
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
