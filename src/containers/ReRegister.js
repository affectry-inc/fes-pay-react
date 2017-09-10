import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Spinner from '../components/Spinner'
import SignUp from '../containers/SignUp'
import LoginCard from '../components/LoginCard'

import * as ReRegisterActions from '../actions/reRegister'

class ReRegister extends Component {

  componentDidMount() {
    const { actions } = this.props
    actions.listenLogin(this.props.params.bandId)
  }

  render() {
    const { isPrivileged, isLoading } = this.props

    return (
      <div>
        { isLoading ? <Spinner top={ 200 } isLoading={ isLoading } /> : isPrivileged ? <SignUp { ...this.props } isReset={ true } /> : <LoginCard /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPrivileged: state.reRegister.isPrivileged,
    isLoading: state.reRegister.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ReRegisterActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReRegister)
