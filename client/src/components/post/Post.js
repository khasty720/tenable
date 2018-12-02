import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Post.scss';
import { Card, CardBody, CardText, CardImg, Button, Tooltip } from 'reactstrap';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: this.props.post.attributes.favorited,
      liked: this.props.post.attributes.liked,
      likes: this.props.post.attributes.likes,
      favTooltipOpen: false,
      likeTooltipOpen: false
    }

    this.deletePost = this.deletePost.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);

    this.toggleFavTooltip = this.toggleFavTooltip.bind(this);
    this.toggleLikeTooltip = this.toggleLikeTooltip.bind(this);
  }

  toggleFavTooltip() {
    this.setState({
      favTooltipOpen: !this.state.favTooltipOpen
    });
  }

  toggleLikeTooltip() {
    this.setState({
      likeTooltipOpen: !this.state.likeTooltipOpen
    });
  }

  toggleFavorite(e) {
    e.preventDefault();
    if (this.state.favorited) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  deletePost(e) {
    e.preventDefault();
    axios({
      method: 'delete',
      url: '/posts/' + this.props.post.id,
    })
    .then(
      success => {
        this.props.removePost(this.props.post.id);
      }
    ).catch(error => {
        console.log(error.response);
    });
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

            <Button id={"likeBtn" + this.props.post.id} className={this.state.liked ? "active" : ""} outline color="primary" size="sm" onClick={this.toggleLike}>
              <span>
                <FontAwesomeIcon icon='heart'/> {this.state.likes}
              </span>
            </Button>
            <Tooltip placement="top" isOpen={this.state.likeTooltipOpen} target={"likeBtn" + this.props.post.id} toggle={this.toggleLikeTooltip} delay={{ show: 500, hide: 0 }}>
              {this.state.liked ? "Unlike" : "Like"}
            </Tooltip>


            <Button id={"favoriteBtn" + this.props.post.id} className={this.state.favorited ? "ml-3 active" : "ml-3"} outline color="primary" size="sm" onClick={this.toggleFavorite}>
               <FontAwesomeIcon icon='star'/>
            </Button>
            <Tooltip placement="top" isOpen={this.state.favTooltipOpen} target={"favoriteBtn" + this.props.post.id} toggle={this.toggleFavTooltip} delay={{ show: 500, hide: 0 }}>
              {this.state.favorited ? "Unfavorite" : "Favorite"}
            </Tooltip>

            { this.props.post.attributes.can_delete &&
              <Button className="ml-3" outline color="danger" size="sm" onClick={this.deletePost}>
                 <FontAwesomeIcon icon='trash-alt'/>
              </Button>
            }
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
      can_delete: PropTypes.bool.isRequired,
      liked: PropTypes.bool.isRequired,
      likes: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string,
    })
  })
};
export default Post;
