import React, { PropTypes, Component } from 'react'
import { Drawer, MenuItem } from 'material-ui'

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
        onRequestChange={closeMainMenu}>
        <MenuItem
          onTouchTap={closeMainMenu}>
          購入履歴
        </MenuItem>
        <MenuItem
          onTouchTap={closeMainMenu}>
          登録情報
        </MenuItem>
        <MenuItem
          onTouchTap={this.toggleAboutSub}>
          FesPayについて
        </MenuItem>
        <div className={classnames('about-sub', {'expanded': this.state.aboutSubOpen})}>
          <MenuItem
            onTouchTap={closeMainMenu}>
            FesPayの使い方
          </MenuItem>
          <MenuItem
            onTouchTap={closeMainMenu}>
            利用規約
          </MenuItem>
          <MenuItem
            onTouchTap={closeMainMenu}>
            プライバシーポリシー
          </MenuItem>
          <MenuItem
            onTouchTap={closeMainMenu}>
            運営会社
          </MenuItem>
        </div>
      </Drawer>
    )
  }
}

export default MainMenu;
