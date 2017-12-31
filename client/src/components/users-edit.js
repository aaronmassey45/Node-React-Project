import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteUser, updateUser } from '../store/actions/userActions';

class AccountEdit extends Component {
  constructor(props) {
    super(props);

    const { user } = props.appState;
    this.state = {
      bio: user.bio,
      currentPassword: '',
      email: user.email,
      location: user.location,
      newPassword: '',
      profileImg: user.profileImg,
      redirect: false,
      username: user.username
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appState === nextProps.appState) return false;
    const { user } = nextProps.appState;
    this.setState({
      bio: user.bio,
      email: user.email,
      location: user.location,
      profileImg: user.profileImg,
      username: user.username
    });
  }

  deleteAccount = async () => {
    try {
      await this.props.deleteUser();
      this.setState({ redirect: true });
    } catch (err) {
      alert("Couldn't delete account");
      console.log(err);
    }
  };

  checkUrl = (url, timeoutT) => {
    return new Promise((resolve, reject) => {
      let timeout = timeoutT || 2500;
      let timer,
        img = new Image();
      img.onerror = img.onabort = function() {
        clearTimeout(timer);
        reject('error');
      };
      img.onload = function() {
        clearTimeout(timer);
        resolve('success');
      };
      timer = setTimeout(function() {
        img.src = '//!!!!/test.jpg';
        reject('timeout');
      }, timeout);
      img.src = url;
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    const {
      bio,
      currentPassword,
      email,
      location,
      newPassword,
      profileImg,
      username
    } = this.state;
    if (!currentPassword) return alert('You must enter your current password');
    if (!bio || !email || !location || !profileImg || !username) {
      return alert("You can't have any empty fields");
    }
    let urlPassed = await this.checkUrl(profileImg);
    if (urlPassed === 'success') {
      try {
        await this.props.updateUser({
          bio,
          currentPassword,
          email,
          location,
          newPassword,
          profileImg,
          username
        });
        alert('Your account was updated!');
      } catch (err) {
        alert(err);
      }
    } else {
      return alert('You profile image link is invalid');
    }
  };

  render() {
    let { bio, email, location, profileImg, redirect, username } = this.state;
    if (redirect) return <Redirect to="/" />;

    return (
      <div className="AccountEdit text-left container my-1">
        <div className="card bg-secondary text-white mb-3">
          <div className="card-body p-2">
            <h4 className="card-title mb-0">Edit User Account</h4>
          </div>
        </div>
        <div className="card bg-light">
          <div className="card-header">Basic Information</div>
          <div className="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group row">
                <label htmlFor="profileImg" className="col-sm-2 col-form-label">
                  Link for Profile Pic*
                </label>
                <div className="col-sm-10 my-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="profileImg"
                    onChange={this.handleChange}
                    value={profileImg}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                  Username*
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={this.handleChange}
                    value={username}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email Address*
                </label>
                <div className="col-sm-10 my-auto">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="location" className="col-sm-2 col-form-label">
                  Location*
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    onChange={this.handleChange}
                    value={location}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="bio" className="col-sm-2 col-form-label">
                  Bio*
                </label>
                <div className="col-sm-10">
                  <textarea
                    id="bio"
                    className="form-control"
                    rows="3"
                    style={{ resize: 'none' }}
                    onChange={this.handleChange}
                    value={bio}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10 my-auto">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    minLength="6"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Current Password*
                </label>
                <div className="col-sm-10 my-auto">
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
            <button
              className="btn btn-danger text-white"
              data-toggle="modal"
              data-target="#deleteModal">
              <i className="fa fa-ban" aria-hidden="true" /> Delete account
            </button>
          </div>
          <div className="card-footer text-right">
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Update
            </button>
          </div>
        </div>

        <div className="modal" id="deleteModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Account</h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-left">
                <p>
                  You are about to delete your account. This is permanent, click
                  'Delete' if you would like to delete your account.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={this.deleteAccount}
                  data-dismiss="modal">
                  Delete
                </button>
                <button className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
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
  return bindActionCreators({ deleteUser, updateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);
