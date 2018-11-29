import React, { Component } from 'react';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Main from './components/main/main';

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
