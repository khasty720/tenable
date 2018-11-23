import React, { Component } from 'react';
import './Login.scss';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

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
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('/api/v1/auth/sign_in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res)
    }).catch(err => err);
  }

  newSession(email, password) {
  // // save this in variable to dont forget
  //   var self = this;
  //   var credentials = {'email': email, 'password': password}
  //
  //
  //   // Post the request
  //   Axios.post(Url.login, {}, {headers: Object.assign(Url.headers, credentials)})
  //   .then(function (response) { // ON SUCCESS
  //     // Valid token received in the headers response
  //     console.log(response);
  //     self.validateToken(response);
  //   })
  //   .catch(function (error) {
  //     // Return error if credentials is invalids
  //     console.log("ERROR DURING newSession (LoginForm.js)", error);
  //   });
  } // End of newSessions()

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
