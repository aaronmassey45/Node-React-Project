import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../store/actions/userActions';

class Login extends Component {
  state = {
    errorClass: 'd-none',
    password: '',
    redirect: false,
    username: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      errorClass: 'd-none',
    });
    try {
      const { password, username } = this.state;
      const credentials = {
        password,
        username,
      };
      let res = await this.props.login(credentials);
      if (res.payload.status === 400) throw new Error();

      this.setState({
        ...this.state,
        redirect: true,
      });
    } catch (err) {
      this.setState({
        ...this.state,
        errorClass: 'd-block',
      });
    }
  };

  render() {
    const { errorClass, password, redirect, username } = this.state;
    const { isFetching, loggedIn } = this.props.appState;

    if (redirect || loggedIn) return <Redirect to="/users/me" />;

    return (
      <div className="Login container">
        <div className="row">
          <div className="col-sm-6 mx-auto mt-5 ">
            <div className="card">
              <div className="card-header">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                {isFetching ? (
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        className="form-control"
                        id="username"
                        onChange={this.handleChange}
                        placeholder="Enter username"
                        required
                        type="text"
                        value={username}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        id="password"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                        type="password"
                        value={password}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Login!
                    </button>
                  </form>
                )}
                <div
                  className={`alert alert-danger mb-0 mt-2 ${errorClass}`}
                  role="alert"
                >
                  <small>Username or password incorrect.</small>
                </div>
              </div>
              <div className="card-footer">
                Not yet a user? <Link to="/signup">Sign Up!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ appState: state.appState });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
