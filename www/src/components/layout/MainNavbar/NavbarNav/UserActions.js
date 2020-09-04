import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import Cookies from 'js-cookie';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
   handleLogout(){
    fetch('/entrance/logout', {
        method: 'POST',
    }).then(res => location.href = res.url)
}

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const userName = Cookies.get('userName');
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src="/images/user.svg"
            alt="User Avatar"
          />
          <span className="d-none d-md-inline-block">{userName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
        <DropdownItem href="/account/password/change" className="text-secondary">
            <i className="material-icons text-secondary">vpn_key</i> Ganti Password
          </DropdownItem>
          <DropdownItem to="/" onClick={this.handleLogout} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
          
        </Collapse>
      </NavItem>
    );
  }
}
