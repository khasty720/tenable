import React, { Component } from 'react';
import './SignIn.scss';
import { Col, Row, Button, Form,  FormGroup, FormFeedback, Label, Input, Card, CardBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { signInUser } from '../../config/redux-token-auth-config';
import { withRouter, Link} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";

class SignIn extends Component {

  render() {
    return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          const email = values.email;
          const password = values.password;
          const { signInUser } = this.props;

          signInUser({ email, password }).then(
            success => {
              actions.setSubmitting(false);
              this.props.history.push('/');
            },
            error => {
              actions.setSubmitting(false);
              // actions.setErrors(formatErrors(error));
              actions.setStatus({ msg: 'Invalid username or password' });
            }
          );
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("email format invalid")
            .required("email is required"),
          password: Yup.string()
            .required("password is required"),
        })}
      >
      { props => {
        const {
          values,
          touched,
          errors,
          status,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="card-default">
                <CardBody>
                  <h5 className="text-center">Sign In</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row form>
                      <Col>
                        {status && status.msg &&
                          <Alert color="danger">
                            {status.msg}
                          </Alert>
                        }
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input
                            id="email"
                            placeholder="Enter your email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            invalid={errors.email && touched.email }
                          />
                          {errors.email && touched.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            invalid={errors.password && touched.password }
                          />
                          {errors.password && touched.password && (
                            <FormFeedback>{errors.password}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form className="text-center">
                      <Col>
                        <Button type="submit" className="btn-info pl-5 pr-5" disabled={isSubmitting}>Sign In</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        );
      }}
      </Formik>
      <Row className="justify-content-center mt-5">
        <Col md="6">
          <Card className="card-default">
            <CardBody className="text-center">
              <Link exact to="/sign-up">
                New? Create an account.
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    );
  }
}
export default connect(
  null,
  { signInUser },
)(withRouter(SignIn))
