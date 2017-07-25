import React, { Component } from 'react'
import { connect } from 'react-redux'

class History extends Component {
  render() {
    return (
      <div>
        <h1>購入履歴のページ</h1>
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
)(History)
