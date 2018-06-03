import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class Login extends Component {
  state = {
    hasErr: false,
    password: '',
    username: '',
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { password, username } = this.state;

    const token = await this.props
      .mutate({
        variables: { username, password },
      })
      .then(res => res.data.login);
    console.log(token);
    localStorage.setItem('x-auth', token);
    await this.props.data.refetch(query);
  };

  render() {
    const { hasErr, password, username } = this.state;
    const { me, loading } = this.props.data;

    if (me) return <Redirect to={`/users/account/${me.username}`} />;

    return (
      <div className="Login container">
        <div className="row">
          <div className="col-sm-6 mx-auto mt-5 ">
            <div className="card">
              <div className="card-header">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                {loading ? (
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        autoComplete="username"
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
                        autoComplete="password"
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
                {hasErr && (
                  <div className="alert alert-danger mb-0 mt-2" role="alert">
                    <small>Username or password incorrect.</small>
                  </div>
                )}
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

const opts = {
  options: {
    context: {
      headers: {
        'x-auth': localStorage.getItem('x-auth'),
      },
    },
  },
};

export default graphql(query, opts)(graphql(mutation)(Login));
