import React, { Component } from 'react'

export class UserItem extends Component {
    // Requires props -- with login, avatar_url, html_url
    render() {
        const { login, avatar_url, html_url } = this.props.user; // Deconstruct props
        // NOTE: local variables -- not state attribute

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
}

export default UserItem
