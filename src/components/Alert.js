import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Alert extends Component {
  render() {
    const actions = [
      <FlatButton
        label="CLOSE"
        secondary={true}
        onTouchTap={this.props.onCloseAlert}
      />,
    ];

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
    );
  }
}

Alert.propTypes = {
  onCloseAlert: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Alert;
