import React from 'react';
import { Col, Row, Card, CardBody, Alert } from 'reactstrap';

const NoResults = (props) => (
  <Row className="justify-content-center mt-5 pt-5">
    <Col md="8">
      <Card className="card-default">
        <CardBody className="text-center">
          <Alert color="primary" className="text-center m-5">
            {props.message}
          </Alert>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default NoResults;
