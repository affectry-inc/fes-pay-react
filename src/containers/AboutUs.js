import React, { Component } from 'react'
import { connect } from 'react-redux'

class AboutUs extends Component {
  render() {
    return (
      <div>
        <h1>運営会社についてのページ</h1>
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
)(AboutUs)
