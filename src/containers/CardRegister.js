import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditCreditCard from '../components/EditCreditCard'

class CardRegister extends Component {
  render() {
    return (
      <div>
        <h2>FesPayへようこそ</h2>
        <h2>リストバンドID：{this.props.match.params.bandId}</h2>
        <EditCreditCard />
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
