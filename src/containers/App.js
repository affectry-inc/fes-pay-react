import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Header from '../components/Header'
import MainMenu from '../components/MainMenu'
import Alert from '../components/Alert'
import LoginDialog from '../components/LoginDialog'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fespayTheme from '../fespayTheme';
import * as AppActions from '../actions/app'

import classnames from 'classnames';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {mainMenuOpen: false};

    this.props.actions.storeBandId(props.params.bandId)
  }

  static get childContextTypes() {
    return {muiTheme: PropTypes.object.isRequired};
  }

  getChildContext(){
    return {muiTheme: getMuiTheme(fespayTheme)};
  }

  toggleMainMenu = () => this.setState({mainMenuOpen: !this.state.mainMenuOpen});
  closeMainMenu = () => this.setState({mainMenuOpen: false});

  render() {
    const { actions, alertOpen, alertMessage, loginOpen, intl, app } = this.props

    return (
      <div>
        <Header
          mainMenuOpen={this.state.mainMenuOpen}
          toggleMainMenu={this.toggleMainMenu}
          locale={intl.locale}
          changeLocale={actions.changeLocale}
        />
        <MainMenu
          mainMenuOpen={this.state.mainMenuOpen}
          closeMainMenu={this.closeMainMenu}
          changeBandId={actions.changeBandId}
          onLogoutTapped={ actions.logout }
          intl={intl}
          app={app}
        />
        <div className={classnames('app-content', {'expanded': this.state.mainMenuOpen})}>
          {this.props.children}
        </div>
        <Alert
          onCloseAlert={ actions.closeAlert }
          open={ alertOpen }
          message={ alertMessage }
          intl={ intl }
        />
        <LoginDialog open={ loginOpen } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    alertOpen: state.app.alertOpen,
    alertMessage: state.app.alertMessage,
    loginOpen: state.app.loginOpen,
    intl: state.intl,
    app: state.app,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
