// initial state here

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const githubApiKeyParam = `client_id=${githubClientId}&client_secret=${githubClientSecret}`; // JGP cleanup

const GithubState = props => {

  // state variables -- users et al
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  // async methods require useReducer hook, dispatch results back?
  //   dispatches a type, like SEARCH_USERS, back to reducer
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const api_url = `https://api.github.com/search/users?q=${text}&${githubApiKeyParam}`;
    const res = await axios.get(api_url);
    // At this point -- async activity completed
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get User
  const getUser = async username => {
    setLoading();
    const api_url = `https://api.github.com/users/${username}?${githubApiKeyParam}`;
    const res = await axios.get(api_url);
    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();
    const api_url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${githubApiKeyParam}`;
    const res = await axios.get(api_url);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        // state attributes
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        // state methods
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;