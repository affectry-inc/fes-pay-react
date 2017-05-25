import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { Link } from 'react-router';

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
          title={<Link className='title' to='/'>FesPay</Link>}
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={toggleMainMenu}
        />
      </header>
    )
  }
}

export default Header;
