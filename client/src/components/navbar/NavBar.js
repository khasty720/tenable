import React from 'react';
import './NavBar.scss';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink } from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  closeNavbar() {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar className="custom-nav" color="secondary" dark expand="md">
          <NavbarBrand href="/">
            <img className="branch-icon" src={('/logo.png')} alt="Logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavLink exact to="/" activeClassName="active" tag={RouterNavLink} onClick={this.closeNavbar}>
                Home
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
