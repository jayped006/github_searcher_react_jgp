import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState('');  // useState hook, replacing state = { text: '' }
    // default value is '' from useState() call

  const onSubmit = e => {  // embedded arrow method
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

// NOTE:
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

export default Search;

