import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {

    // props -- required to have
    //   searchUsers function --
    //     search GITHUB API for users async
    //   clearUsers function -- state management
    //     clear the global users list state and loading: false
    //   showClear boolean
    //     if true, show the 'clear' button, else dont (after form)
    //
    //   Example instantiation (e.g. from App.js)
    //       <Search
    //         searchUsers={this.searchUsers}
    //         clearUsers={this.clearUsers}
    //         showClear={this.state.users.length > 0 ? true : false}
    //       />

    state = { // component level state, track search term
        text: '' // search text from form, user-entered
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
      };
    
      onSubmit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Empty search phrase, please enter a search phrase', 'light');
        } else { // user has entered a search string
            this.props.searchUsers(this.state.text);
            // NOTE: github api search function, passed with props
            this.setState({ text: '' });
            // Reset for next search, already saved the prev value.
        }
      };
    
      onChange = e => this.setState({ [e.target.name]: e.target.value });
    
      render() {
        const { showClear, clearUsers } = this.props;
    
        return (
          <div>
            <form onSubmit={this.onSubmit} className='form'>
              <input
                type='text'
                name='text'
                placeholder='Search Users...'
                value={this.state.text}
                onChange={this.onChange}
              />
              <input
                type='submit'
                value='Search'
                className='btn btn-dark btn-block'
              />
            </form>
            { showClear && (
              <button className='btn btn-light btn-block' onClick={clearUsers}>
                Clear
              </button>
            )}
          </div>
        );
      }
}

export default Search
