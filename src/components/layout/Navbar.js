import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({icon, title}) => { // if props passed, need title and icon strings
 
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
    </nav>
  );
}

// Assign additional properties to functional component
//   defaultProps and propTypes.  Assigning properties to a function.

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
