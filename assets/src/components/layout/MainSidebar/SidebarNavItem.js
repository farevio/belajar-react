import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }
  render(){
   
    return(
      this.props.item.to == '#' ? 
      <Dropdown nav={true} tag="li" open={this.state.open} toggle={this.toggle}>
        <DropdownToggle tag="a" href={this.props.item.to} nav={true}>
        {this.props.item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: this.props.item.htmlBefore }}
        />
      )}
      {this.props.item.title && <span>{this.props.item.title}</span>}
      {this.props.item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: this.props.item.htmlAfter }}
        />
      )}
        </DropdownToggle>
        <DropdownMenu>
            {this.props.item.child.map((dItem, idx)=>(
                <DropdownItem key={idx} tag="a" href={dItem.to}>{dItem.title}</DropdownItem>
            ))}
          
         
        </DropdownMenu>
      </Dropdown>
      :
  <NavItem>
    <NavLink tag="a" href={this.props.item.to}>
      {this.props.item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: this.props.item.htmlBefore }}
        />
      )}
      {this.props.item.title && <span>{this.props.item.title}</span>}
      {this.props.item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: this.props.item.htmlAfter }}
        />
      )}
    </NavLink>
  </NavItem>
  )
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
