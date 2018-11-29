import React, { Component } from 'react';
import './footer.scss';
import { Col } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <Col className="pt-5 pb-5 bg-secondary footer text-center">
        <p className="m-0 text-light">Tenable Challenge &copy; {(new Date().getFullYear())}</p>
      </Col>
    );
  }
}

export default Footer;
