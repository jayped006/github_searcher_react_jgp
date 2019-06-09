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
    const api_url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    // console.log(api_url);
    const res = await axios.get(api_url);
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