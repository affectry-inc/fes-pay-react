import React, { PropTypes, Component } from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'

import classnames from 'classnames';

const styles = {
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

class Header extends Component {

  render() {
    const { mainMenuOpen, toggleMainMenu } = this.props;
    return (
      <header className="header">
        <AppBar
          className={classnames('app-bar', {'expanded': mainMenuOpen})}
          title="FesPay"
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={toggleMainMenu}
        />
      </header>
    )
  }
}

export default Header;
