import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import I18n from '../utils/i18n'

class Alert extends Component {
  render() {
    const actions = [
      <FlatButton
        label={ I18n.t(this.props.intl, 'alert.close') }
        secondary={true}
        onTouchTap={this.props.onCloseAlert}
      />,
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          {this.props.message}
        </Dialog>
      </div>
    )
  }
}

Alert.propTypes = {
  onCloseAlert: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
}

export default Alert
