import React, { Component } from 'react';
import './NotFound.scss';
import { Row, Col, Button } from 'reactstrap';

class NotFound extends Component {
  render() {
    return (
      <Row>
        <Col className="text-center">
          <h1>404: Not found</h1>
          <a className="btn btn-info" href="/">Back to home</a>
        </Col>
      </Row>
    );
  }
}

export default NotFound;
