import React, { Component } from 'react';
import './Favorites.scss';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import Post from '../post/Post';
import NoResults from '../feed/NoResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Favorites extends Component {
  constructor () {
    super()
    this.state = {
      posts: []
    }
    this.getFavorites = this.getFavorites.bind(this)
    this.removePost = this.removePost.bind(this)
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    axios.get('/favorites')
      .then(res => {
          const posts = res.data.data;
          this.setState({posts: posts})
      })
  }

  removePost(post_id) {
    const filteredPosts = this.state.posts.filter(post => post.id !== post_id);
    this.setState({posts: filteredPosts});
  }

  renderPostList = (posts) => (
    <div>
      {posts.map(post =>
        <Row className="justify-content-center" key={post.id}>
          <Col xs="12" md="6">
            <Post post={post} removePost={this.removePost} removeFavorite={this.removePost} />
          </Col>
        </Row>
      )}
    </div>
  )

  render() {
    return (
      <div>
        <h4 className="text-center mb-4">
          Favorites
        </h4>
        { this.state.posts.length ? this.renderPostList(this.state.posts) : <NoResults message="No favorited posts found."/>}
      </div>
    );
  }
}
export default Favorites;
