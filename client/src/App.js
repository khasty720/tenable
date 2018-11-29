import React, { Component } from 'react';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

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
