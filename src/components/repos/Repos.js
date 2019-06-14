import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import GithubContext from '../../context/github/githubContext';

const Repos = () => {
    const githubContext = useContext(GithubContext);
    const { repos } = githubContext;
    return repos.map(repo => <RepoItem key={repo.id} repo={repo} /> );
    // Note: need key attribute, why? React rqmt, because list of components, each needs uniq key prop
};

export default Repos;
