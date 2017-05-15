import React, { PropTypes, Component } from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'

import classnames from 'classnames';

class Header extends Component {


  render() {
    const { mainMenuOpen, toggleMainMenu } = this.props;
    return (
      <header className="header">
        <AppBar
          className={classnames('app-bar', {'expanded': mainMenuOpen})}
          title="FesPay"
          onLeftIconButtonTouchTap={toggleMainMenu}
        />
      </header>
    )
  }
}

export default Header;
