import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { graphql } from 'react-apollo';

import query from '../../queries/CurrentUser';
import mutation from '../../mutations/Logout';
import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';
import UserSearch from './UserSearch';

class Navbar extends Component {
  handleLogout = () => {
    this.props
      .mutate({
        refetchQueries: [{ query }],
      })
      .then(() => localStorage.removeItem('x-auth'))
      .catch(err => console.log(err));
  };

  renderButtons = () => {
    const { loading, me } = this.props.data;

    if (!loading) {
      return me ? (
        <AuthedButtons username={me.username} logout={this.handleLogout} />
      ) : (
        <UnauthedButtons />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Chowster</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="navbar-collapse collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mb-0 p-0">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink to="/" exact className="nav-link">
                <i className="fa fa-home fa-fw" />
                Home
              </NavLink>
            </li>
            {this.renderButtons()}
          </ul>
          <UserSearch />
        </div>
      </nav>
    );
  }
}

export default graphql(query)(graphql(mutation)(Navbar));
