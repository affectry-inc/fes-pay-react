import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Drawer, Menu, MenuItem } from 'material-ui'
// import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
// import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import Avatar from 'material-ui/Avatar'
import ListIcon from 'material-ui/svg-icons/action/list'
import PersonIcon from 'material-ui/svg-icons/social/person-outline'
import { QRIcon } from '../components/Icons'
import I18n from '../utils/i18n'
import SimpleDialog from '../components/SimpleDialog'

import classnames from 'classnames'

const styles = {
  subMenu: {
    paddingLeft: '20px'
  },
  menuList: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
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
    browserHistory.push('/history/' + value)
  }

  logout = () => {
    this.props.onLogoutTapped()
    this.props.closeMainMenu()
  }

  push = (e, item, idx) => {
    if (item.props.value) {
      this.props.closeMainMenu()
      browserHistory.push(item.props.value)
    }
  }

  render() {
    const { mainMenuOpen, closeMainMenu, intl, app } = this.props
    let bandIdMenuItem, historyMenuItem, settingsMenuItem, logoutMenuItem

    if (app.bandId) {
      const bandIdList = app.bandIds ? Object.keys(app.bandIds) : []

      let leftIcon, menuText, value

      if (bandIdList.indexOf(app.bandId) >= 0) {
        leftIcon = <Avatar src={ app.bandIds[app.bandId].photoUrl } />
        menuText = 'X-' + app.bandIds[app.bandId].cardLastDigits

        historyMenuItem =
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.history') }
            leftIcon={ <ListIcon /> }
            value={ '/history/' + app.bandId }
          />
        settingsMenuItem =
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.settings') }
            leftIcon={ <PersonIcon /> }
            value={ '/settings/' + app.bandId }
          />
      } else {
        leftIcon = <QRIcon />
        menuText = I18n.t(intl, 'mainMenu.notRegistered')
        value = '/yeah/' + app.bandId
      }

      let items = []
      bandIdList.forEach(id => {
        if (id !== app.bandId) {
          items.push(
            <MenuItem
              key={ id }
              value={ id }
              primaryText={ 'X-'  + app.bandIds[id].cardLastDigits }
              leftIcon={ <Avatar src={ app.bandIds[id].photoUrl } />}
            />
          )
        }
      })

      bandIdMenuItem =
        <MenuItem
          primaryText={ menuText }
          leftIcon={ leftIcon }
          value={ (items.length === 0) ? value : '' }
          innerDivStyle={{ color: 'black' }}
          rightIcon={ (items.length > 0) ? <ArrowDropRight /> : null }
          menuItems={ (items.length > 0) &&
            <Menu onChange={ this.changeBandId } listStyle={ styles.menuList }>
              { items }
            </Menu>
          }
        />
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
        <Menu onItemTouchTap={ this.push } listStyle={ styles.menuList }>
          { bandIdMenuItem }
          { historyMenuItem }
          { settingsMenuItem }
          { logoutMenuItem }
          <MenuItem
            primaryText={ I18n.t(intl, 'mainMenu.about') }
            // rightIcon={ this.state.aboutSubOpen ? <ArrowUpIcon /> : <ArrowDownIcon /> }
            // onTouchTap={ this.toggleAboutSub }
          />
        </Menu>
        <div className={ classnames('about-sub', {'expanded': this.state.aboutSubOpen}) }>
          <Menu onItemTouchTap={ this.push } listStyle={ styles.menuList }>
            <MenuItem
              primaryText={ I18n.t(intl, 'mainMenu.howTo') }
              value='/howto'
              style={ styles.subMenu }
            />
            <MenuItem
              primaryText={ I18n.t(intl, 'mainMenu.terms') }
              value='/terms'
              style={{ ...styles.subMenu, display: 'none' }}
            />
            <MenuItem
              primaryText={ I18n.t(intl, 'mainMenu.comAct') }
              value='/com_act'
              style={ styles.subMenu }
            />
            <MenuItem
              primaryText={ I18n.t(intl, 'mainMenu.privacy') }
              value='/privacy'
              style={{ ...styles.subMenu, display: 'none' }}
            />
            <a href='http://jepco.org' target='_default' style={{ textDecoration: 'none' }}>
              <MenuItem
                primaryText={ I18n.t(intl, 'mainMenu.aboutUs') }
                style={ styles.subMenu }
                onClick={ closeMainMenu } />
            </a>
          </Menu>
        </div>
      </Drawer>
    )
  }
}

export default MainMenu
