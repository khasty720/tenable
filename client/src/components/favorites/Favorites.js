import React, { Component } from 'react';
import './Favorites.scss';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import Post from '../post/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class Favorites extends Component {
  constructor () {
    super()
    this.state = {
      posts: []
    }
    this.getFavorites = this.getFavorites.bind(this)
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    axios.get('/favorites')
      .then(res => {
          const posts = res.data;
          this.setState({posts: posts})
      })
  }

  render() {
    return (
      <div>
        <h4 className="text-center mb-4">
          Favorites
        </h4>

        {this.state.posts.map(function(post, id){
           return (
             <Row className="justify-content-center" key={id}>
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
export default Favorites;
