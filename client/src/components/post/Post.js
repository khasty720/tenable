import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Post.scss';
import { Card, CardBody, CardText, CardImg, Button } from 'reactstrap';
import Moment from 'react-moment';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: this.props.post.attributes.favorited,
    }

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  toggleFavorite(e) {
    e.preventDefault();
    if (this.state.favorited) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite() {
    axios({
      method: 'post',
      url: '/favorites',
      data: {
        post_id: this.props.post.id
      }
    })
    .then(
      success => {
        this.setState(
          {favorited: true}
        )
      }
    ).catch(error => {
        console.log(error.response);
    });
  }

  removeFavorite() {
    axios({
      method: 'post',
      url: '/favorites/remove',
      data: {
        post_id: this.props.post.id
      }
    })
    .then(
      success => {
        this.props.removeFavorite(this.props.post.id);
      }
    ).catch(error => {
        console.log(error.response);
    });
  }

  render() {
    return (
      <Card className="card-default mb-4">
        <CardImg top width="100%" src={this.props.post.attributes.image_url} alt="post image" />
        <CardBody>
          <CardText>
            <small className="text-muted float-right">
              <b>{this.props.post.attributes.nickname}</b> &#8226; <Moment fromNow>{this.props.post.attributes.created_at}</Moment>
            </small>
          </CardText>
          <CardText>
            {this.props.post.attributes.message}
          </CardText>
          <CardText className="text-right">
            <Button className={this.state.favorited ? "active" : ""} outline color="primary" size="sm" onClick={this.toggleFavorite}>
              Favorite
            </Button>
            <Button className="ml-2" outline color="primary" size="sm">
              Like
            </Button>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      message: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string,
    })
  })
};
export default Post;
