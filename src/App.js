import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: true // set true once loaded
  }

  async componentDidMount() {
    this.setState({ loading: true});  // cant simply use state.loading directly
    const res = await axios.get('https://api.github.com/users?client_id=6eb89c1cef55190c2a11&client_secret=c5a3a3720db41bee7035836578d0e52e6485da29');
    this.setState({ users: res.data, loading: false } );
    // console.log(res.data);
  }

  render() {
    return (
      <div className='App'>
        <Navbar   title="Github Finder (JGP)" icon="fab fa-github"/>
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;