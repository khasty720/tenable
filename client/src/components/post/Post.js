import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Post.scss';
import { Card, CardBody, CardText, CardImg, Button } from 'reactstrap';
import Moment from 'react-moment';

class Post extends Component {
  render() {
    return (
      <Card className="card-default mb-4">
        <CardImg top width="100%" src={this.props.post.image_url} alt="post image" />
        <CardBody>
          <CardText>
            <small className="text-muted float-right">
              <Moment fromNow>{this.props.post.created_at}</Moment>
            </small>
          </CardText>
          <CardText>
            {this.props.post.message}
          </CardText>
          <CardText>
            <Button className="float-right" outline color="primary" size="sm">
              Like
            </Button>
            <Button className="float-right mr-1" outline color="primary" size="sm">
              Favorite
            </Button>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  })
};
export default Post;
