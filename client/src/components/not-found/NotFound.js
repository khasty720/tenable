import React, { Component } from 'react';
import './NotFound.scss';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <Row>
        <Col className="text-center">
          <h1>404: Not found</h1>
          <Button color="info" tag={Link} to="/" >Back to home</Button>
        </Col>
      </Row>
    );
  }
}

export default NotFound;
