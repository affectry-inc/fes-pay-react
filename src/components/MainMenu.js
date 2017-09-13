import React, { Component } from 'react'
import { Link } from 'react-router'
import { Drawer, Menu, MenuItem, DropDownMenu } from 'material-ui'
// import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
// import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import I18n from '../utils/i18n'
import SimpleDialog from '../components/SimpleDialog'

import classnames from 'classnames'

const styles = {
  subMenu: {
    paddingLeft: '20px'
  },
}

class MainMenu extends Component {

  constructor(props) {
    super(props)
    this.state = { aboutSubOpen: true, logoutDialogOpen: false }
  }

  toggleAboutSub = () => this.setState({ aboutSubOpen: !this.state.aboutSubOpen })

  toggleLogoutDialog = () => this.setState({ logoutDialogOpen: !this.state.logoutDialogOpen })

  changeBandId = (event, value) => {
    this.props.changeBandId(value)
    this.props.closeMainMenu()
  }

  logout = () => {
    this.props.onLogoutTapped()
    this.props.closeMainMenu()
  }

  render() {
    const { mainMenuOpen, closeMainMenu, intl, app } = this.props
    let bandIdMenuItem, historyMenuItem, settingsMenuItem, logoutMenuItem

    let bandIds = Array.from(new Set([...app.bandIds]))
    if (bandIds.indexOf(app.bandId) < 0) { bandIds.unshift(app.bandId) }

    if (app.bandId) {
      if (bandIds.length <= 1) {
        bandIdMenuItem = <MenuItem primaryText={ I18n.t(intl, 'mainMenu.qrCode') + app.bandId } />
      } else {
        let items = []
        bandIds.map(id => {
          return items.push(
            <MenuItem
              key={ id }
              value={ id }
              primaryText={ id }
              containerElement={ <Link to={ '/history/' + id } /> }
            />
          )
        })
        bandIdMenuItem =
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.qrCode') + app.bandId }
            rightIcon={ <ArrowDropRight /> }
            menuItems={
              <Menu onChange={ this.changeBandId }>
                { items }
              </Menu>
            }
          />
      }

      if (app.bandId && app.bandIds.indexOf(app.bandId) >= 0) {
        historyMenuItem =
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.history') }
            containerElement={ <Link to={'/history/' + app.bandId} /> }
            onTouchTap={ closeMainMenu } />
        settingsMenuItem =
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.settings') }
            containerElement={ <Link to={'/settings/' + app.bandId} /> }
            onTouchTap={ closeMainMenu } />
      }
    }

    if (false && app.uid) { // TODO: consider logoutability
      logoutMenuItem =
        <div>
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.logout') }
            onTouchTap={ this.toggleLogoutDialog }
          />
          <SimpleDialog
            openDialog={ this.state.logoutDialogOpen }
            msgIntlId='mainMenu.sureToLogout'
            actionLabelIntlId='mainMenu.logout'
            onTouchAction={ this.logout }
            onTouchCancel={ this.toggleLogoutDialog }
            intl={ intl }
          />
        </div>
    }

    return (
      <Drawer
        docked={ false }
        width={ 280 }
        open={ mainMenuOpen }
        onRequestChange={ closeMainMenu }
      >
        { bandIdMenuItem }
        { historyMenuItem }
        { settingsMenuItem }
        { logoutMenuItem }
        <MenuItem
          primaryText={ I18n.t(intl, 'mainMenu.about') }
          // rightIcon={ this.state.aboutSubOpen ? <ArrowUpIcon /> : <ArrowDownIcon /> }
          // onTouchTap={ this.toggleAboutSub }
        />
        <div className={ classnames('about-sub', {'expanded': this.state.aboutSubOpen}) }>
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.howTo') }
            containerElement={ <Link to="/howto" /> }
            style={ styles.subMenu }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.terms') }
            containerElement={ <Link to="/terms" /> }
            style={{ ...styles.subMenu, display: 'none' }}
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.comAct') }
            containerElement={ <Link to="/com_act" /> }
            style={ styles.subMenu }
            onTouchTap={ closeMainMenu } />
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.privacy') }
            containerElement={ <Link to="/privacy" /> }
            style={{ ...styles.subMenu, display: 'none' }}
            onTouchTap={ closeMainMenu } />
          <a href='http://jepco.org' target='_default' style={{ textDecoration: 'none' }}>
            <MenuItem
              primaryText={ I18n.t(intl, 'mainMenu.aboutUs') }
              style={ styles.subMenu }
              onTouchTap={ closeMainMenu } />
          </a>
        </div>
      </Drawer>
    )
  }
}

export default MainMenu
