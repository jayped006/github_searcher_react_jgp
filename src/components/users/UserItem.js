import React from 'react';
import PropTypes from 'prop-types';

const UserItem = (props) => {  // Requires props -- with login, avatar_url, html_url
    const { login, avatar_url, html_url } = props.user; // Deconstruct props
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
          <a href={html_url} className='btn btn-dark btn-sm my-1'>
            More
          </a>
        </div>
      </div>
    );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired, // doesnt specify need for avatar_url, etc
}

export default UserItem
