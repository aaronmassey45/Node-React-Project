import React, {Component} from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isUserAuthenticated } from '../store/actions/loginActions';

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
              <NavLink to="/" exact className="nav-link">Home</NavLink>
            </li>
            {
              this.props.appState.loggedIn ?
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle fake-link" id='navbarDropdown' role='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a>
                  <div className="dropdown-menu bg-dark dropdown-menu-right" aria-labelledby='navbarDropdown'>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <Link to="/users/me" className="nav-link">Profile</Link>
                    </div>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <Link to='/users/account/edit' className="nav-link">Account</Link>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <span className="nav-link fake-link" onClick={this.handleLogout}>Logout</span>
                    </div>
                  </div>
                </li> :
                <span style={{display: 'inline-flex'}}>
                  <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                  <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
