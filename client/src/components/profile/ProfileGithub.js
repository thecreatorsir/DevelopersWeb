import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
class ProfileGithub extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      clientId: "34e67306874fae8ac801",
      clientSecret: "47f85f1c1bd691acc0884f051908685bbde1b5c2",
      count: 6,
      sort: "created: asc",
      repos: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    );
    const data = await response.json();
    if (this._isMounted) {
      this.setState({ repos: data });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map((repo) => (
      <div key={repo.id} className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>
              <Link
                to={repo.html_url}
                className='text-info'
                target='_blank'
                rel='noreferrer'
              >
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className='col-md-6'>
            <span className='badge badge-info mr-1'>
              Stars: {repo.stargazers_count}
            </span>
            <span className='badge badge-secondary mr-1'>
              Watchers: {repo.watchers_count}
            </span>
            <span className='badge badge-success'>
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        {repoItems.length > 0 ? (
          <>
            <h3 className='mb-4'>Latest Github Repos</h3>
            {repoItems}
          </>
        ) : null}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
