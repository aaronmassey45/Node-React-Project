import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  state = {
    password: '',
    redirect: false,
    username: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, username } = this.state;
      let res = await axios.post('/user/login', { password, username });
      let token = res.headers['x-auth'];
      localStorage.setItem('x-auth', token);
      this.setState({ redirect: true });
    } catch (err) {
      alert('Login failed!');
      console.log(err);
    }
  }

  render() {
    const { password, redirect, username } = this.state;
    if (redirect) return <Redirect to='/users/me' />;

    return (
      <div className='Login container'>
        <div className="row">
          <div className="col-sm-6 mx-auto mt-5 ">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleChange} value={username} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} value={password} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
              <div className="card-footer">
                Not yet a user? <Link to='/signup'>Sign Up!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
