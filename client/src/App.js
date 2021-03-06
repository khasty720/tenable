import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrashAlt, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faPlus, faTrashAlt, faHeart, faStar)

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
