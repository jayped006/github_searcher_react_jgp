import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// functional component Spinner
const Spinner = () => 
    <Fragment>
        <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </Fragment>

export default Spinner
