import React, { Component } from 'react'
import { connect } from 'react-redux'

class TermsOfUse extends Component {
  render() {
    return (
      <div>
        <h1>Terms of use</h1>
        <h2>Comming Soon..</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfUse)
