import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import EditCreditCard from '../components/EditCreditCard'
import EditFacePhoto from '../components/EditFacePhoto'
import EditPhoneNumber from '../components/EditPhoneNumber'
import FinishedStepContent from '../components/FinishedStepContent'

import * as SignUpActions from '../actions/signUp'

class SignUp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stepIndex: 0,
      dispCardNo: '',
      dispPhotoUrl: '',
    }
  }

  // saveCreditCard = (lastDigits) => {
  //   this.setState({
  //     stepIndex: this.state.stepIndex + 1,
  //     dispCardNo: '****-****-****-' + lastDigits,
  //   })
  // }

  saveFacePhoto = (photoUrl) => {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
      dispPhotoUrl: photoUrl,
    })
  }

  resetCreditCard = () => {
    this.setState({
      stepIndex: 0,
      dispCardNo: '',
    })
  }

  resetFacePhoto = () => {
    this.setState({
      stepIndex: 1,
      dispPhotoUrl: '',
    })
  }

  render() {
    const { stepIndex, dispCardNo, dispPhotoUrl } = this.state;
    const { idx, actions } = this.props;

    return (
      <div>
        <h2>FesPayへようこそ！</h2>
        <h2>リストバンドID：{this.props.params.bandId}</h2>
        <Stepper activeStep={idx} orientation="vertical">
          <Step>
            <StepLabel>クレジットカード登録</StepLabel>
            <StepContent>
              <EditCreditCard
                // onTouchGoNext={this.saveCreditCard}
                onTouchGoNext={actions.saveCreditCard}
              />
            </StepContent>
            <FinishedStepContent text={dispCardNo} />
          </Step>
          <Step>
            <StepLabel>顔写真</StepLabel>
            <StepContent>
              <EditFacePhoto
                bandId={this.props.params.bandId}
                onTouchGoNext={this.saveFacePhoto}
                onTouchGoPrev={this.resetCreditCard}
              />
            </StepContent>
            <FinishedStepContent imageUrl={dispPhotoUrl}/>
          </Step>
          <Step>
            <StepLabel>携帯電話番号</StepLabel>
            <StepContent>
              <EditPhoneNumber
                onTouchGoPrev={this.resetFacePhoto}
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    idx: state.signUp.stepIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
