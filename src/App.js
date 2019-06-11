import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
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

   // Get single Github user
   getUser = async user => {
    this.setState({ loading: true });

    const api_url = `https://api.github.com/users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(api_url);

    this.setState({ user: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Alert
  setAlert = (alertMsg, alertType) => {
    this.setState({ alert: { msg: alertMsg, type: alertType}});

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>

            <Route exact path='/' render={ props => (
              <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
              </Fragment>
            )} /> 

            <Route exact path='/about' component={About} />

            <Route exact path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />

          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;