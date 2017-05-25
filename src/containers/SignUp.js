import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'

import EditCreditCard from '../components/EditCreditCard'
import EditFacePhoto from '../components/EditFacePhoto'
import EditPhoneNumber from '../components/EditPhoneNumber'
import FinishedStepContent from '../components/FinishedStepContent'

import * as SignUpActions from '../actions/signUp'

class SignUp extends Component {

  render() {
    const { stepIndex, dispCardNo, dispPhotoUrl, actions } = this.props

    return (
      <div>
        <h2>FesPayへようこそ！</h2>
        <h2>リストバンドID：{ this.props.params.bandId }</h2>
        <Stepper activeStep={ stepIndex } orientation="vertical">
          <Step>
            <StepLabel>クレジットカード登録</StepLabel>
            <StepContent>
              <EditCreditCard
                onTouchGoNext={ actions.saveCreditCard }
              />
            </StepContent>
            <FinishedStepContent text={ dispCardNo } />
          </Step>
          <Step>
            <StepLabel>顔写真</StepLabel>
            <StepContent>
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
            <StepContent>
              <EditPhoneNumber
                onTouchGoPrev={ actions.resetFacePhoto }
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
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
