import React, { Component } from 'react';
import './Favorites.scss';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import Post from '../post/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Favorites extends Component {
  constructor () {
    super()
    this.state = {
      posts: []
    }
    this.getFavorites = this.getFavorites.bind(this)
    this.removeFavorite = this.removeFavorite.bind(this)
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

  removeFavorite(post_id) {
    const filteredPosts = this.state.posts.filter(post => post.id !== post_id);
    this.setState({posts: filteredPosts});
  }

  renderPostList = (posts) => (
    <div>
      {posts.map((post, id)  =>
        <Row className="justify-content-center" key={id}>
          <Col xs="12" md="6">
            <Post post={post} removeFavorite={this.removeFavorite}/>
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
        {this.renderPostList(this.state.posts)}
      </div>
    );
  }
}
export default Favorites;
