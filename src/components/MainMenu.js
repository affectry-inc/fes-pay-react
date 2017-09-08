import React, { Component } from 'react'
import { Link } from 'react-router'
import { Drawer, MenuItem, DropDownMenu } from 'material-ui'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import I18n from '../utils/i18n'

import classnames from 'classnames'

class MainMenu extends Component {

  constructor(props) {
    super(props)
    this.state = { aboutSubOpen: true }
  }

  toggleAboutSub = () => this.setState({ aboutSubOpen: !this.state.aboutSubOpen })

  changeBandId = (event, index, value) => {
    this.props.changeBandId(value)
    this.props.closeMainMenu()
  }

  render() {
    const { mainMenuOpen, closeMainMenu, intl, app } = this.props
    let bandIdMenuItem, historyMenuItem, settingsMenuItem

    let bandIds = Array.from(new Set([...app.bandIds]))
    if (bandIds.indexOf(app.bandId) < 0) { bandIds.unshift(app.bandId) }

    if (app.bandId) {
      if (bandIds.length <= 1) {
        bandIdMenuItem = <MenuItem primaryText={ 'Band ID: ' + app.bandId } />
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
          <div>
            <span>Band ID:</span>
            <DropDownMenu value={ app.bandId } onChange={this.changeBandId}>
              { items }
            </DropDownMenu>
          </div>
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
