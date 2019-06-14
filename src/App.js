import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
  // Replace state = { users: [], user: {}, repos: [], loading: false, alert: null }
  const [users, setUsers] = useState([]);  // creates users variable, default []
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]); // from /users/<user>/repos
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users for search string -- async REST API call
  const searchUsers = async text => {
    setLoading(true);
    // REST API async processing to get matching users to search string
    const api_url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    const res = await axios.get(api_url);
    setUsers(res.data.items);
    setLoading(false);
    // Note: guaranteed to have res.data.items because of 'await'
  };

  // Get single Github user -- async REST API call
  const getUser = async user => {
    setLoading(true); // update state
    // REST API async processing to get info on one user
    const api_url = `https://api.github.com/users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(api_url);
    // update state
    setUser(res.data);
    setLoading(false);
  };

  // Get users repos -- async REST API call
  const getUserRepos = async user => {
    setLoading(true); // update state
    // REST API call to /users/<user>/repos<params>, async await result
    const api_url = `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(api_url);
    // Update state
    setRepos(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false );
  };

  // Alert
  const setAlertInComponent = (alertMsg, alertType) => {
    setAlert({ msg: alertMsg, type: alertType });
    // auto-clear in 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>

              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlertInComponent}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />

              <Route exact path='/about' component={About} />

              <Route exact path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />

            </Switch>
          </div>
        </div>
      </Router>
    );
};

export default App;