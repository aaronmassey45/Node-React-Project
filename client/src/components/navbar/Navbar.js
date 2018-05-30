import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isUserAuthenticated, logout } from '../../store/actions/userActions';
import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';
import UserSearch from './UserSearch';

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
      return loggedIn ? (
        <AuthedButtons username={username} logout={this.handleLogout} />
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
          <UserSearch history={this.props.history} />
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
