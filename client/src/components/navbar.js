import React, {Component} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
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
              <NavLink to="/users/me" exact className="nav-link">My Account</NavLink>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <span className="nav-link fake-link">Logout</span>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}
