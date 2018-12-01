import React, { Component } from 'react';
import './Feed.scss';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Post from '../post/Post';
import Moment from 'react-moment';

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
          const posts = res.data;
          this.setState({posts: posts})
      })
  }

  render() {
    return (
      <div>
        {this.state.posts.map(function(post){
           return (
             <Row className="justify-content-center">
               <Col xs="12" md="6">
                 <Post post={post}/>
               </Col>
             </Row>
           )
         })}
      </div>
    );
  }
}
export default Feed;
