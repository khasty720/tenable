import React, { Component } from 'react';
import { Col, Row, Button, Form,  FormGroup, FormFeedback, Label, Input, Card, CardBody, Alert } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

class CreatePost extends Component {
  render() {
    return (
    <div>
      <Formik
        initialValues={{ message: "", imageUrl: "" }}
        onSubmit={(values, actions) => {
          const body = {
            message: values.message,
            image_url: values.imageUrl
          }

          axios({
            method: 'post',
            url: '/posts',
            data: body
          })
          .then(
            success => {
              actions.setSubmitting(false);
              this.props.history.push('/');
            }
          ).catch(error => {
              actions.setSubmitting(false);
              console.log(error.response);
              actions.setStatus({ msg: "Failed to create post" });
              actions.setFieldError("imageUrl", error.response.data.image_url);
              actions.setFieldError("message", error.response.data.message);
          });
        }}
        validationSchema={Yup.object().shape({
          message: Yup.string()
            .required("message is required")
            .max(280),
          imageUrl: Yup.string()
            .url("invalid image url")
            .required("image url is required"),
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
                  <h5 className="text-center">Create Post
                    <Link to="/">
                      <Button className="float-right" close />
                    </Link>
                  </h5>
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
                          <Label for="imageUrl">Image Url</Label>
                          <Input
                            id="imageUrl"
                            placeholder="https://placeholdit.imgix.net/"
                            type="text"
                            value={values.imageUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.imageUrl && touched.imageUrl }
                          />
                          {errors.imageUrl && touched.imageUrl && (
                            <FormFeedback>{errors.imageUrl}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <FormGroup>
                          <Label for="message">Message</Label>
                          <Input
                            id="message"
                            placeholder="Limit 280 charaters"
                            type="textarea"
                            maxLength="280"
                            rows="4"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.message && touched.message }
                          />
                          {errors.message && touched.message && (
                            <FormFeedback>{errors.message}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form className="text-center">
                      <Col>
                        <Button type="submit" className="pl-5 pr-5" outline color="primary" disabled={isSubmitting}>Create</Button>
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
    </div>
    );
  }
}
export default withRouter(CreatePost);
