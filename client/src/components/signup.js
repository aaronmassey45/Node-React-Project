import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signup } from '../store/actions/userActions';

class SignUp extends Component {
  state = {
    isAFoodTruck: false,
    email: '',
    password: '',
    signupFailed: false,
    username: ''
  };

  handleChange = e => {
    if (e.target.id === 'isAFoodTruck')
      return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { isAFoodTruck, email, password, username } = this.state;
      await this.props.signup({
        isAFoodTruck,
        email,
        password,
        username
      });
    } catch (err) {
      this.setState({ signupFailed: true });
      console.log(err);
    }
  };

  render() {
    const { isFetching, loggedIn } = this.props.appState;
    if (loggedIn) return <Redirect to="/users/me" />;

    const {
      isAFoodTruck,
      email,
      password,
      signupFailed,
      username
    } = this.state;

    return (
      <div className="SignUp container my-1">
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="card">
              <div className="card-body">
                {isFetching ? (
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={this.handleChange}
                        value={email}
                      />
                      <small
                        id="emailHelp"
                        className="form-text text-muted text-left">
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Create a username"
                        aria-describedby="userHelp"
                        onChange={this.handleChange}
                        value={username}
                      />
                      <div className="row" id="userHelp">
                        <div className="col-6 text-left">
                          <small className="form-text text-muted">Min: 4</small>
                        </div>
                        <div className="col-6 text-right">
                          <small className="form-text text-muted">
                            Max: 20
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        aria-describedby="passHelp"
                        onChange={this.handleChange}
                        value={password}
                      />
                      <small className="form-text text-muted text-left">
                        Min: 6
                      </small>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isAFoodTruck"
                          onChange={this.handleChange}
                          checked={isAFoodTruck}
                        />
                        Is this a food truck account?
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Submit
                    </button>
                  </form>
                )}
              </div>
              {signupFailed ? (
                <div className="alert alert-danger" role="alert">
                  Signup failed! Try again.
                </div>
              ) : (
                ''
              )}
              <div className="card-footer">
                Already a user? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signup }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
