import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false, // true while async loading in place ==> Spinner
    alert: null // console.log analog, when not null -- object with msg, type
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

  // Alert
  setAlert = (alertMsg, alertType) => {
    this.setState({ alert: { msg: alertMsg, type: alertType}});

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;