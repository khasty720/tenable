import React, { Component } from 'react';
import './Home.scss';
import { Row, Col } from 'reactstrap';
import Feed from '../feed/Feed';

class Home extends Component {
  render() {
    return (
      <div className="mb-5">
        <h4 className="mb-4 text-center">Feed</h4>
        <Feed />
      </div>
    );
  }
}

export default Home;
