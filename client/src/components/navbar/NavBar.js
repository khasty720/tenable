import React, { Component } from 'react';
import './Navbar.scss';
import { NavLink as RouterNavLink, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { signOutUser } from '../../config/redux-token-auth-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.signOut = this.signOut.bind(this);
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

  signOut(e) {
    e.preventDefault();
    const { signOutUser } = this.props;
    signOutUser()
      .then(() =>
        this.props.history.push('/sign-in')
      )
      .catch(
        console.log("Sign out error.")
      )
  }

  render() {
    return (
      <div>
        <Navbar className="custom-nav" color="secondary" dark expand="md">
          <NavbarBrand href="/">
            <FontAwesomeIcon icon={['fab', 'pied-piper']} size="2x" color="white"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { this.props.currentUser.isSignedIn &&
                <NavLink exact to="/" activeClassName="active" tag={RouterNavLink} onClick={this.closeNavbar}>
                  Home
                </NavLink>
              }
              { this.props.currentUser.isSignedIn &&
                <NavLink exact to="/favorites" activeClassName="active" tag={RouterNavLink} onClick={this.closeNavbar}>
                  Favorites
                </NavLink>
              }
              { !this.props.currentUser.isSignedIn &&
                <NavLink exact to="/sign-in" activeClassName="active" tag={RouterNavLink} onClick={this.closeNavbar}>
                  Sign In
                </NavLink>
              }
              { !this.props.currentUser.isSignedIn &&
                <NavLink exact to="/sign-up" activeClassName="active" tag={RouterNavLink} onClick={this.closeNavbar}>
                  Sign Up
                </NavLink>
              }
              { this.props.currentUser.isSignedIn &&
                <NavLink href="#" onClick={this.signOut}>
                 Sign Out
                </NavLink>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
   currentUser: state.reduxTokenAuth.currentUser
});


export default connect(
  mapStateToProps,
  {
    signOutUser
  },
)(withRouter(NavBar))
