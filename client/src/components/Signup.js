import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignUp extends Component {
  state = {
    isAFoodTruck: false,
    email: '',
    errors: null,
    password: '',
    username: '',
  };

  handleChange = e => {
    if (e.target.id === 'isAFoodTruck')
      return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { isAFoodTruck, email, password, username } = this.state;

    this.props
      .mutate({ variables: { username, password, email, isAFoodTruck } })
      .then(res => {
        localStorage.setItem('x-auth', res.data.signup);
        this.props.data.refetch();
      })
      .catch(e => {
        let errors = e.graphQLErrors.map(({ message }) => message);
        if (errors.length === 1) errors = errors[0].split(',');
        this.setState({ errors });
      });
  };

  render() {
    const { isAFoodTruck, email, errors, password, username } = this.state;

    const { me, loading } = this.props.data;

    if (me) return <Redirect to={`/users/account/${me.username}`} />;

    return (
      <div className="SignUp container my-1">
        <div className="row">
          <div className="col-10 col-lg-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                {loading ? (
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
              {errors && (
                <div className="alert alert-danger" role="alert">
                  {errors.map(err => <div key={err}>{err}</div>)}
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

export default compose(
  graphql(mutation),
  graphql(query, {
    options: props => ({
      variables: { withLikedPosts: false },
    }),
  })
)(SignUp);
