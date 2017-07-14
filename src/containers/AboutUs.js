import React, { Component } from 'react'
import { connect } from 'react-redux'

class AboutUs extends Component {
  render() {
    return (
      <div>
        <h1>About Usのページ</h1>
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
