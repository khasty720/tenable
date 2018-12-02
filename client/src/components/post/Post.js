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
      liked: this.props.post.attributes.liked,
      likes: this.props.post.attributes.likes,
    }

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
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
        this.setState(
          {favorited: false}
        )
        this.props.removeFavorite(this.props.post.id);
      }
    ).catch(error => {
        console.log(error.response);
    });
  }

  toggleLike(e) {
    e.preventDefault();
    if (this.state.liked) {
      this.removeLike();
    } else {
      this.addLike();
    }
  }

  addLike() {
    axios({
      method: 'post',
      url: '/likes',
      data: {
        post_id: this.props.post.id
      }
    })
    .then(
      success => {
        const likes = this.state.likes + 1;
        this.setState({
            liked: true,
            likes: likes
        })
      }
    ).catch(error => {
        console.log(error.response);
    });
  }

  removeLike() {

    axios({
      method: 'post',
      url: '/likes/remove',
      data: {
        post_id: this.props.post.id
      }
    })
    .then(
      success => {
        const likes = this.state.likes - 1;
        this.setState({
            liked: false,
            likes: likes
        })
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

            <Button className={this.state.liked ? "active" : ""} outline color="primary" size="sm" onClick={this.toggleLike}>
              {this.state.liked ? "Unlike" : "Like"} {this.state.likes}
            </Button>

            <Button className={this.state.favorited ? "ml-2 active" : "ml-2"} outline color="primary" size="sm" onClick={this.toggleFavorite}>
               {this.state.favorited ? "Unfavorite" : "Favorite"}
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
      liked: PropTypes.bool.isRequired,
      likes: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string,
    })
  })
};
export default Post;
