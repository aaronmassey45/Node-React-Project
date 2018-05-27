import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isUserAuthenticated, logout } from '../../store/actions/userActions';
import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';

class Navbar extends Component {
  checkAuth = async () => {
    try {
      await this.props.isUserAuthenticated();
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.checkAuth();
  }

  handleLogout = async () => {
    try {
      await this.props.logout(this.props.history);
      this.checkAuth();
    } catch (err) {
      alert("You aren't logged in");
      console.log(err);
    }
  };

  renderButtons = () => {
    const { loading, loggedIn, username } = this.props;
    if (!loading) {
      return !loggedIn ? (
        <AuthedButtons username={username} logout={this.handleLogout} />
      ) : (
        <UnauthedButtons />
      );
    } else {
      return null;
    }
  };

  searchUser = async e => {
    e.preventDefault();
    if (this.refs.userSearch.value) {
      try {
        const users = await axios.get('/api/userlist');
        const foundUser = users.data.find(
          user => user.username === this.refs.userSearch.value
        );
        if (!foundUser)
          return alert(`No user found: ${this.refs.userSearch.value}`);
        this.props.history.push(`/users/account/${foundUser.username}`);
        this.refs.userSearch.value = '';
      } catch (err) {
        console.log(err);
      }
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
          <form
            className="form-inline justify-content-end"
            onSubmit={this.searchUser}
          >
            <input
              type="search"
              placeholder="Search username"
              className="form-control mr-sm-2"
              ref="userSearch"
            />
            <button
              className="btn btn-outline-light my-sm-0 my-2 mx-auto"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ appState }) => ({
  loading: appState.isFetching,
  loggedIn: appState.loggedIn,
  username: appState.user.username,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ isUserAuthenticated, logout }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
