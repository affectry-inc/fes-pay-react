import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import EditCreditCard from '../components/EditCreditCard'
import EditFacePhoto from '../components/EditFacePhoto'
import EditPhoneNumber from '../components/EditPhoneNumber'
import FinishedStepContent from '../components/FinishedStepContent'

class CardRegister extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stepIndex: 0,
      dispCardNo: '',
      dispPhotoUrl: '',
    }
  }

  saveCreditCard = (lastDigits) => {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
      dispCardNo: '****-****-****-' + lastDigits,
    })
  }

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

    return (
      <div>
        <h2>FesPayへようこそ！</h2>
        <h2>リストバンドID：{this.props.bandId}</h2>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>クレジットカード登録</StepLabel>
            <StepContent>
              <EditCreditCard
                onTouchGoNext={this.saveCreditCard}
              />
            </StepContent>
            <FinishedStepContent text={dispCardNo} />
          </Step>
          <Step>
            <StepLabel>顔写真</StepLabel>
            <StepContent>
              <EditFacePhoto
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardRegister);
