import React, { Component } from 'react'
import { AppBar, FlatButton } from 'material-ui'
import { Link } from 'react-router';

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

  onChangeLocale = () => {
    const newLocale = this.props.locale === 'en' ? 'ja' : 'en'
    this.props.changeLocale(newLocale)
  }

  render() {
    const { toggleMainMenu, locale } = this.props
    return (
      <header className="header">
        <AppBar
          className='app-bar'
          title={
            <Link className='title' to='/'>
              <img src={logo} alt='Logo' style={styles.titleImage} />
            </Link>
          }
          titleStyle={styles.title}
          iconElementRight={<FlatButton label={locale === 'en' ? '日本語' : 'English'} />}
          onLeftIconButtonTouchTap={toggleMainMenu}
          onRightIconButtonTouchTap={this.onChangeLocale}
        />
      </header>
    )
  }
}

export default Header;
