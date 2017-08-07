import React, { Component } from 'react'
import { Link } from 'react-router'
import { Drawer, MenuItem } from 'material-ui'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import I18n from '../utils/i18n'

import classnames from 'classnames'

class MainMenu extends Component {

  constructor(props) {
    super(props)
    this.state = { aboutSubOpen: false }
  }

  toggleAboutSub = () => this.setState({ aboutSubOpen: !this.state.aboutSubOpen })

  render() {
    const { mainMenuOpen, closeMainMenu, intl } = this.props
    return (
      <Drawer
        docked={ false }
        width={ 280 }
        open={ mainMenuOpen }
        onRequestChange={ closeMainMenu }
      >
        <MenuItem
          primaryText={ I18n.t(intl, 'mainMenu.history') }
          containerElement={ <Link to="/history" /> }
          onTouchTap={ closeMainMenu } />
        <MenuItem
          primaryText={ I18n.t(intl, 'mainMenu.settings') }
          containerElement={ <Link to="/settings" /> }
          onTouchTap={ closeMainMenu } />
        <MenuItem
          primaryText={ I18n.t(intl, 'mainMenu.about') }
          rightIcon={ this.state.aboutSubOpen ? <ArrowUpIcon /> : <ArrowDownIcon /> }
          onTouchTap={ this.toggleAboutSub } />
        <div className={ classnames('about-sub', {'expanded': this.state.aboutSubOpen}) }>
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.howTo') }
            insetChildren={ true }
            containerElement={ <Link to="/howto" /> }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.terms') }
            insetChildren={ true }
            containerElement={ <Link to="/terms" /> }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.comAct') }
            insetChildren={ true }
            containerElement={ <Link to="/com_act" /> }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.privacy') }
            insetChildren={ true }
            containerElement={ <Link to="/privacy" /> }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.aboutUs') }
            insetChildren={ true }
            containerElement={ <Link to="/about" /> }
            onTouchTap={ closeMainMenu } />
        </div>
      </Drawer>
    )
  }
}

export default MainMenu
