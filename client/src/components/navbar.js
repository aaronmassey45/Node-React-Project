import React, {Component} from 'react';

export default class Navbar extends Component {
  // handleLogout = () => {
  //   const token = localStorage.getItem('x-auth');
  //   let res = await axios.get('/users/me', { headers: { 'x-auth': token } });
  // }

  render() {
    return (
      <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
        <span className="navbar-brand mb-0 h1">Chowster</span>
        <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <a href="/" className="nav-item nav-link">Home</a>
            <a href="/login" className="nav-item nav-link">Login</a>
            <a href="/signup" className="nav-item nav-link">Sign Up</a>
            <a href="/logout" className="nav-item nav-link">Logout</a>
          </ul>
        </div>
      </nav>
    );
  }
}
