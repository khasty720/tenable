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

  renderPostList = (posts) => (
    <div>
      {posts.map((post, id)  =>
        <Row className="justify-content-center" key={id}>
          <Col xs="12" md="6">
            <Post post={post} />
          </Col>
        </Row>
      )}
    </div>
  )

  render() {
    return (
      <div>
        <Row className="fixed-bottom">
          <Col>
            <Link to="/posts/new">
              <Button className="float-right btn-floating" color="primary">
                <FontAwesomeIcon icon='plus' color="white"/>
              </Button>
            </Link>
          </Col>
        </Row>

        <h4 className="text-center mb-4">
          Image Feed
        </h4>
        {this.renderPostList(this.state.posts)}
      </div>
    );
  }
}
export default Feed;
