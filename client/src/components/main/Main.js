import React, { Component } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from '../home/Home';
import NotFound from '../not-found/NotFound';

class Main extends Component {
  render() {
    return (
      <Container className="main-container">
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
    );
  }
}

export default Main;
