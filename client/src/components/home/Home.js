import React, { Component } from 'react';
import './home.scss';
import { Row, Col } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div className="mb-5">
        <h4 className="mb-4 text-center">Home</h4>
        <Row>
          <Col xs="12" md="4" className="mb-5">

          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
