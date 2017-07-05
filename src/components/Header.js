import React, { Component } from 'react'
import { AppBar } from 'material-ui'
import { Link } from 'react-router';

import classnames from 'classnames';
import logo from '../img/logo_m_w_h_wh_tr.png'

const styles = {
  title: {
    textAlign: 'center',
  },
  titleImage: {
    height: '80%',
    verticalAlign: 'middle',
  }
};

class Header extends Component {

  render() {
    const { mainMenuOpen, toggleMainMenu } = this.props;
    return (
      <header className="header">
        <AppBar
          className={classnames('app-bar', {'expanded': mainMenuOpen})}
          title={
            <Link className='title' to='/'>
              <img src={logo} alt='Logo' style={styles.titleImage} />
            </Link>
          }
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={toggleMainMenu}
        />
      </header>
    )
  }
}

export default Header;
