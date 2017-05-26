import React, { Component } from 'react'
import { Drawer, MenuItem } from 'material-ui'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import classnames from 'classnames';

class MainMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {aboutSubOpen: false};
  }

  toggleAboutSub = () => this.setState({aboutSubOpen: !this.state.aboutSubOpen});

  render() {
    const { mainMenuOpen, closeMainMenu } = this.props;
    return (
      <Drawer
        docked={false}
        open={mainMenuOpen}
        onRequestChange={closeMainMenu}
      >
        <MenuItem
          primaryText='購入履歴'
          onTouchTap={closeMainMenu} />
        <MenuItem
          primaryText='登録情報'
          onTouchTap={closeMainMenu} />
        <MenuItem
          primaryText='FesPayについて'
          rightIcon={this.state.aboutSubOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          onTouchTap={this.toggleAboutSub} />
        <div className={classnames('about-sub', {'expanded': this.state.aboutSubOpen})}>
          <MenuItem
            primaryText='FesPayの使い方'
            insetChildren={true}
            onTouchTap={closeMainMenu} />
          <MenuItem
            primaryText='利用規約'
            insetChildren={true}
            onTouchTap={closeMainMenu} />
          <MenuItem
            primaryText='プライバシーポリシー'
            insetChildren={true}
            onTouchTap={closeMainMenu} />
          <MenuItem
            primaryText='運営会社'
            insetChildren={true}
            onTouchTap={closeMainMenu} />
        </div>
      </Drawer>
    )
  }
}

export default MainMenu;
