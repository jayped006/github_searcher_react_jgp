import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserItem = (props) => {  // Requires props -- with login, avatar_url, html_url
  const { login, avatar_url } = props.user; // Deconstruct props, no longer using html_url
  // NOTE: local variables -- not prop or state attribute

  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired, // doesnt specify need for avatar_url, etc
}

export default UserItem
