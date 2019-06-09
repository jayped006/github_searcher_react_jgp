import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
  componen
  render() {
    return (
      <div className='App'>
        <Navbar   title="Github Finder (JGP)" icon="fab fa-github"/>
        <div className='container'>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;