import React, {Component} from 'react';
import axios from 'axios';

export default class Navbar extends Component {
  handleLogout = async () => {
    try {
      const token = localStorage.getItem('x-auth');
      await axios.delete('/logout', { headers: { 'x-auth': token } });
      localStorage.setItem('x-auth', null);
      alert('You logged out successfully');
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <nav className='navbar fixed-top navbar-dark bg-dark'>
        <span className="navbar-brand mb-0 h1">Chowster</span>
        <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <a href="/" className="nav-item nav-link">Home</a>
            <a href="/login" className="nav-item nav-link">Login</a>
            <a href="/signup" className="nav-item nav-link">Sign Up</a>
            <span className="nav-item nav-link fake-link" onClick={this.handleLogout}>Logout</span>
          </ul>
        </div>
      </nav>
    );
  }
}
