import React, { Component } from 'react'
import { connect } from 'react-redux'

class Settings extends Component {
  render() {
    return (
      <div>
        <h1>登録情報</h1>
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
)(Settings)
