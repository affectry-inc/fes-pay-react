import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import RefreshIndicator from 'material-ui/RefreshIndicator'

class Spinner extends Component {
  render(){
    const { top, isLoading } = this.props

    return(
      <RefreshIndicator
        size={ 40 }
        left={ -20 }
        top={ top }
        status={ isLoading ? 'loading' : 'hide' }
        style={{marginLeft: '50%', marginTop: '0%'}}
      />
    )
  }
}

Spinner.propTypes = {
  top: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default Spinner
