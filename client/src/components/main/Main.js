import React, { Component } from 'react';
import './main.scss';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from '../home/home';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import NotFound from '../not-found/not-found';
import { generateRequireSignInWrapper } from 'redux-token-auth'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/sign-in',
})

class Main extends Component {
  render() {
    return (
      <Container className="main-container">
        <Switch>
          <Route exact path='/' component={requireSignIn(Home)}></Route>
          <Route exact path='/favorites' component={requireSignIn(Favorites)}></Route>
          <Route exact path='/sign-in' component={SignIn}></Route>
          <Route exact path='/sign-up' component={SignUp}></Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
    );
  }
}

export default Main;
