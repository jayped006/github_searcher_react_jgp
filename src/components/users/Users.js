import React, { useContext } from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => { // props with users (list) and loading attributes
    const githubContext = useContext(GithubContext);
    const { loading, users } = githubContext;
    return (
        loading
        ? <Spinner />
        : <div style={userStyle}>
              { users.map( user => ( <UserItem key={user.id} user={user} /> ) ) }
          </div>
    );
    // NOTE: What stops the spinner?
    //       VDOM processing triggered of render().
    //       Cascade render of children.
    //       loading now false. No more Spinner.
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users
