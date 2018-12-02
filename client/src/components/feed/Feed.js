import React, { Component } from 'react';
import './Feed.scss';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import Post from '../post/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class Feed extends Component {
  constructor () {
    super()
    this.state = {
      posts: []
    }
    this.getPosts = this.getPosts.bind(this)
    this.removePost = this.removePost.bind(this)
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get('/posts')
      .then(res => {
          const posts = res.data.data;
          this.setState({posts: posts})
      })
  }

  removePost(post_id) {
    console.log(post_id);
    const filteredPosts = this.state.posts.filter(post => post.id !== post_id);
    this.setState({posts: filteredPosts});
  }

  renderPostList = (posts) => (
    <div>
      {posts.map((post, id)  =>
        <Row className="justify-content-center" key={id}>
          <Col xs="12" md="6">
            <Post post={post} removePost={this.removePost}/>
          </Col>
        </Row>
      )}
    </div>
  )

  render() {
    return (
      <div>
        <Col xs={{ size: 1, offset: 11 }} className="fixed-bottom float-right">
          <Link to="/posts/new">
            <Button className="float-right btn-floating" color="primary">
              <FontAwesomeIcon icon='plus' color="white"/>
            </Button>
          </Link>
        </Col>

        <h4 className="text-center mb-4">
          Image Feed
        </h4>
        {this.renderPostList(this.state.posts)}
      </div>
    );
  }
}
export default Feed;
