import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signup } from '../store/actions/userActions';

class SignUp extends Component {
  state = {
    isAFoodTruck: false,
    email: '',
    errmsg: '',
    password: '',
    signupFailed: false,
    username: '',
  };

  handleChange = e => {
    if (e.target.id === 'isAFoodTruck')
      return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ signupFailed: false });
    try {
      const { isAFoodTruck, email, password, username } = this.state;
      let res = await this.props.signup({
        isAFoodTruck,
        email,
        password,
        username,
      });
      if (res.error) {
        let error = 'Signup failed!';
        if (res.payload.response.code === 11000) {
          let match = res.payload.response.errmsg.match(/"(.*?)"/)[1];
          error = `${match} already in use!`;
        }
        this.setState({ errmsg: error });
        throw new Error(error);
      }
    } catch (err) {
      this.setState({ signupFailed: true });
      console.log(err);
    }
  };

  render() {
    const { isFetching, loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/users/me" />;

    const {
      isAFoodTruck,
      email,
      errmsg,
      password,
      signupFailed,
      username,
    } = this.state;

    return (
      <div className="SignUp container my-1">
        <div className="row">
          <div className="col-10 col-lg-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                {isFetching ? (
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        aria-describedby="emailHelp"
                        className="form-control"
                        id="email"
                        onChange={this.handleChange}
                        placeholder="Enter email"
                        type="email"
                        value={email}
                      />
                      <small
                        id="emailHelp"
                        className="form-text text-muted text-left"
                      >
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        autoComplete="username"
                        aria-describedby="userHelp"
                        className="form-control"
                        id="username"
                        placeholder="Create a username"
                        onChange={this.handleChange}
                        type="text"
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
                        aria-describedby="passHelp"
                        autoComplete="new-password"
                        className="form-control"
                        id="password"
                        onChange={this.handleChange}
                        placeholder="Password"
                        type="password"
                        value={password}
                      />
                      <small className="form-text text-muted text-left">
                        Min: 6
                      </small>
                    </div>
                    <div className="form-check my-2">
                      <label className="form-check-label">
                        <input
                          checked={isAFoodTruck}
                          className="form-check-input"
                          id="isAFoodTruck"
                          onChange={this.handleChange}
                          type="checkbox"
                        />
                        Is this a food truck account?
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Create Account
                    </button>
                  </form>
                )}
              </div>
              {signupFailed && (
                <div className="alert alert-danger" role="alert">
                  {errmsg}
                </div>
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

const mapStateToProps = ({ appState }) => ({
  loading: appState.isFetching,
  loggedIn: appState.loggedIn,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signup }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
