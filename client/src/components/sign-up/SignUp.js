import React, { Component } from 'react';
import './SignUp.scss';
import { Col, Row, Button, Form, FormGroup, FormFeedback, Label, Input, Card, CardBody, Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { registerUser } from '../../config/redux-token-auth-config'
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";

class SignUp extends Component {

  render() {
    return (
      <Formik
        initialValues={{ email: "", nickname: "", password: "", passwordConfirmation: ""  }}
        onSubmit={(values, actions) => {
          const email = values.email;
          const nickname = values.nickname;
          const password = values.password;
          const passwordConfirmation = values.passwordConfirmation;
          const { registerUser } = this.props;

          registerUser({ email, nickname, password, passwordConfirmation }).then(
            success => {
              actions.setSubmitting(false);
              this.props.history.push('/');
            },
            error => {
              actions.setSubmitting(false);
              // actions.setErrors(formatErrors(error));
              actions.setStatus({ msg: 'Error failed to create user' });
            }
          );
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("email format invalid")
            .required("email is required"),
          nickname: Yup.string()
            .required("nickname is required")
            .min(6)
            .max(20),
          password: Yup.string()
            .required("password is required")
            .min(8)
            .max(20),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], "password does not match")
            .required("confirm password is required")
            .min(8)
            .max(20),
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
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="card-default">
                <CardBody>
                  <h5 className="text-center">Sign Up</h5>
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
                          <Label for="email">Email</Label>
                          <Input
                            id="email"
                            placeholder="Enter your email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                          <Label for="nickname">Nickname</Label>
                          <Input
                            id="nickname"
                            placeholder="Nickname123"
                            type="text"
                            value={values.nickname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.nickname && touched.nickname }
                          />
                          {errors.nickname && touched.nickname && (
                            <FormFeedback>{errors.nickname}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.password && touched.password }
                          />
                          {errors.password && touched.password && (
                            <FormFeedback>{errors.password}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label for="passwordConfirmation">Confirm Password</Label>
                          <Input
                            id="passwordConfirmation"
                            placeholder="Confirm Password"
                            type="password"
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.passwordConfirmation && touched.passwordConfirmation }
                          />
                          {errors.passwordConfirmation && touched.passwordConfirmation && (
                            <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form className="text-center">
                      <Col>
                        <Button type="submit" className="pl-5 pr-5" outline color="primary" disabled={isSubmitting}>Sign Up</Button>
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
    );
  }
}
export default connect(
  null,
  { registerUser },
)(withRouter(SignUp))
