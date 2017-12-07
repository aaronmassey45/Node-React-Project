import React, {Component} from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
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
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fake-link" id='navbarDropdown' role='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
              <div className="dropdown-menu bg-dark" aria-labelledby='navbarDropdown'>
                <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <Link to="/users/me" className="nav-link">Profile</Link>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <span className="nav-link fake-link" onClick={this.handleLogout}>Logout</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
 });

export default connect(mapStateToProps)(Navbar);
