import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { FormattedHTMLMessage } from 'react-intl'

import I18n from '../utils/i18n'

const styles = {
  alignCenter: {
    textAlign: 'center',
  },
  buttonStyle: {
    margin: '0 0.5em'
  },
}

class SimpleDialog extends Component {

  static propTypes = {
    openDialog: PropTypes.bool.isRequired,
    msgIntlId: PropTypes.string.isRequired,
    actionLabelIntlId: PropTypes.string.isRequired,
    onTouchAction: PropTypes.func.isRequired,
    onTouchCancel: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }

  render() {
    const { openDialog, msgIntlId, actionLabelIntlId, onTouchAction, onTouchCancel, intl } = this.props

    return (
      <Dialog
        actions={[
          <RaisedButton
            label={ I18n.t(intl, actionLabelIntlId) }
            secondary={ true }
            style={ styles.buttonStyle }
            onTouchTap={ onTouchAction }
          />,
          <FlatButton
            label={ I18n.t(intl, 'simpleDialog.cancel') }
            style={ styles.buttonStyle }
            onTouchTap={ onTouchCancel }
          />
        ]}
        modal={ false }
        open={ openDialog }
        onRequestClose={ onTouchCancel }
        contentStyle={ styles.alignCenter }
        actionsContainerStyle={ styles.alignCenter }
      >
        <FormattedHTMLMessage
          id={ msgIntlId }
          defaultMessage=''
        />
      </Dialog>
    )
  }
}

export default SimpleDialog
