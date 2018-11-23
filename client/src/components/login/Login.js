import React, { Component } from 'react';
import './Login.scss';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import Axios from 'axios';
import { ApiUrl } from '../../config/ApiUrl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    Axios.post('/api/v1/auth/sign_in', {}, {headers: Object.assign(ApiUrl.headers, credentials)})
    .then(function (response) {
      console.log(response);
      self.validateToken(response);
    })
    .catch(function (error) {
      console.log("Login error: ", error);
    });
  }

  validateToken(response) {
    let accessToken = {
      "access-token": response.headers["access-token"],
      "client": response.headers.client,
      "uid": response.headers.uid
    }

    Axios.get('/api/v1/auth/validate_token',
      {
        headers: Object.assign(ApiUrl.headers, accessToken)
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Token validation error: ", error);
    });
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="card-default">
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="user@example.com" value={this.state.email} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.password} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="btn-info float-right">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Login;
