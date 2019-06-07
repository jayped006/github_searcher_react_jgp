import React, { Component, Fragment } from 'react';
import './App.css'; // global CSS

class App extends Component {
  show_me() { return 'This is it'; }
  render() {  // Lifecycle method
    const name = 'Jack Spratt'
    const show_me_too = () => 'It\'s a gas';
    return (
      <Fragment>
        <h1>Hello, {this.show_me()}</h1>
        <h2>Test, {show_me_too()}</h2>
      </Fragment>
    );
  }
}

export default App;
