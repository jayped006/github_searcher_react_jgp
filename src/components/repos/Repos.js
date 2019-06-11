import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos }) => {
    return repos.map(repo => <RepoItem key={repo.id} repo={repo} /> );
    // Note: need key attribute, why? React rqmt, because list of components, each needs uniq key prop
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired
};

export default Repos;
