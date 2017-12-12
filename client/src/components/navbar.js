import React, {Component} from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isUserAuthenticated } from '../store/actions/userActions';

class Navbar extends Component {
  componentWillMount() {
    this.props.actions.isUserAuthenticated();
  }

  handleLogout = async () => {
    try {
      const token = localStorage.getItem('x-auth');
      await axios.delete('/logout', { headers: { 'x-auth': token } });
      localStorage.setItem('x-auth', null);
      window.location.href = '/';
    } catch (err) {
      alert('You aren\'t logged in')
      console.log(err);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.location !== this.props.location;
  }

  render() {
    return (
      <nav className='navbar fixed-top navbar-expand-md navbar-dark bg-dark'>
        <span className="navbar-brand mb-0 h1">Chowster</span>
        <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="collapse navbar-collapse mb-0 justify-content-end p-0" id="navbarNav">
          <div className="navbar-nav">
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink to="/" exact className="nav-link">
                <i className="fa fa-home fa-fw" />
                Home
              </NavLink>
            </li>
            {
              this.props.appState.loggedIn ?
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle fake-link" id='navbarDropdown' role='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.appState.user.username}
                  </a>
                  <div className="dropdown-menu bg-dark dropdown-menu-right" aria-labelledby='navbarDropdown'>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <NavLink to="/users/me" exact className="nav-link">
                        <i className="fa fa-user fa-fw" />
                        Profile
                      </NavLink>
                    </div>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <NavLink to='/users/account/edit' exact className="nav-link">
                      <i className="fa fa-pencil fa-fw" />
                        Account
                      </NavLink>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <span className="nav-link fake-link" onClick={this.handleLogout}>
                        <i className="fa fa-sign-out fa-fw" />
                        Logout
                      </span>
                    </div>
                  </div>
                </li> :
                <span style={{display: 'inline-flex'}}>
                  <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/login" exact className="nav-link">
                      <i className="fa fa-sign-in fa-fw" />
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/signup" exact className="nav-link">
                      <i className="fa fa-user-plus fa-fw" />
                      Sign Up
                    </NavLink>
                  </li>
                </span>
            }
          </div>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
 });

 const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({isUserAuthenticated}, dispatch)
 });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
