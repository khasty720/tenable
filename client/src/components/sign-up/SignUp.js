import React, { Component } from 'react';
import './SignUp.scss';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody, Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { registerUser } from '../../config/redux-token-auth-config'
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nickname: '',
      passwordConfirm: ''
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

  handleSubmit (e) {
    e.preventDefault()

    const { registerUser } = this.props
    const {
      email,
      nickname,
      password,
      password_confirmation
    } = this.state
    registerUser({ email, nickname, password, password_confirmation })
      .then(() =>
        this.props.history.push('/')
      )
      .catch(() =>
        this.setState(() => ({
          error: <Alert color="danger">Sign Up failed.</Alert>
        })
      ));
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="card-default">
            <CardBody>
              <h5 className="text-center">Sign Up</h5>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col>
                    {this.state.error}
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="nickname">Nickname</Label>
                      <Input type="text" name="nickname" id="nickname" placeholder="Nickname123" value={this.state.nickname} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="email" placeholder="user@example.com" value={this.state.email} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="passwordConfirm">Confrim Password </Label>
                      <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="password" value={this.state.passwordConfirm} onChange={this.handleInputChange}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form className="text-center">
                  <Col>
                    <Button className="btn-info pl-5 pr-5">Sign Up</Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default connect(
  null,
  { registerUser },
)(withRouter(SignUp))
