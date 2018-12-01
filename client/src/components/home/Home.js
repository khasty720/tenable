import React, { Component } from 'react';
import './Home.scss';
import Feed from '../feed/Feed';

class Home extends Component {
  render() {
    return (
      <div className="mb-5">
        <Feed />
      </div>
    );
  }
}

export default Home;
