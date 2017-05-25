import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import Header from '../components/Header'
import MainMenu from '../components/MainMenu'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fespayTheme from '../fespayTheme';

import classnames from 'classnames';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {mainMenuOpen: false};
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
    return (
      <div>
        <Header
          mainMenuOpen={this.state.mainMenuOpen}
          toggleMainMenu={this.toggleMainMenu}
        />
        <MainMenu
          mainMenuOpen={this.state.mainMenuOpen}
          closeMainMenu={this.closeMainMenu}
        />
        <div className={classnames('app-content', {'expanded': this.state.mainMenuOpen})}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
