import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false // set true once loaded
  }

   // Search Github users (me: what of componentDidMount?)
   searchUsers = async text => {
    this.setState({ loading: true });
    const api_url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    const res = await axios.get(api_url);
    this.setState({ users: res.data.items, loading: false });
      // Note: guaranteed to have res.data.items because of 'await'
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;