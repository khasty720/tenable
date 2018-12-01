import React, { Component } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from '../home/Home';
import Favorites from '../favorites/Favorites';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import NotFound from '../not-found/NotFound';
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
