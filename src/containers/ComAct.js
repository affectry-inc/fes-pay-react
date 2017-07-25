import React, { Component } from 'react'
import { connect } from 'react-redux'

class ComAct extends Component {
  render() {
    return (
      <div>
        <h1>特定商取引法に基づく表記のページ</h1>
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
)(ComAct)
