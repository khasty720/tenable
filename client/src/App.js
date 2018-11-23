import React, { Component } from 'react';
import './App.scss';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';

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
