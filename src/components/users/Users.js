import React from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({users, loading}) => { // props with users (list) and loading attributes
    return (
        loading
        ? <Spinner />
        : <div style={userStyle}>
                    {users.map(user => (
                        <UserItem key={user.id} user={user} />
                    ))}
        </div>
    )
    // NOTE: What stops the spinner?  App.js creates Users component with loading false.
    //       So the spinner starts spinning.  App.js componentDidMount
    //       starts async request to github api, and does async wait.
    //       Afterwards, it sets loading to false in state within App.
    //          App.js DidMount ==> this.setState({ users: res.data, loading: false } );
    //       How does this percolate down to the Users component and
    //       cause it to update?
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users
