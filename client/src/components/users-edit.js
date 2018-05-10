import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteUser, updateUser } from '../store/actions/userActions';
import Alert from './alert';
import addAlertProps from './HOCs/add-alert';

class AccountEdit extends Component {
  constructor(props) {
    super(props);

    const { user } = props.appState;
    this.state = {
      bio: user.bio,
      currentPassword: '',
      email: user.email,
      isAFoodTruck: user.isAFoodTruck,
      errors: {
        bio: '',
        email: '',
        location: '',
        profileImg: '',
        username: '',
      },
      location: user.location,
      newPassword: '',
      profileImg: user.profileImg,
      username: user.username,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appState === nextProps.appState) return false;
    const { user } = nextProps.appState;
    this.setState({
      bio: user.bio,
      email: user.email,
      isAFoodTruck: user.isAFoodTruck,
      location: user.location,
      profileImg: user.profileImg,
      username: user.username,
    });
  }

  deleteAccount = async () => {
    try {
      await this.props.deleteUser();
      this.props.history.push('/');
    } catch (err) {
      this.props.updateAlert({
        bg: 'danger',
        msg: 'Could not delete account. Try again later.',
      });
      this.props.show();
      console.log(err);
    }
  };

  checkUrl = url => {
    return new Promise((resolve, reject) => {
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
      }, 2500);
      img.src = url;
    });
  };

  handleChange = e => {
    if (e.target.id === 'isAFoodTruck')
      return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    const {
      bio,
      currentPassword,
      email,
      isAFoodTruck,
      location,
      newPassword,
      profileImg,
      username,
    } = this.state;
    let urlPassed;
    if (!currentPassword) {
      this.props.updateAlert({
        bg: 'warning',
        msg: 'You must enter your current password!',
      });
      this.props.show();
      return;
    }

    let errors = this.validate({ bio, email, location, profileImg, username });
    if (Object.keys(errors).length) {
      return this.setState({
        ...this.state,
        errors,
      });
    }
    try {
      urlPassed = await this.checkUrl(profileImg);
      if (urlPassed === 'success') {
        try {
          let res = await this.props.updateUser({
            bio,
            currentPassword,
            email,
            isAFoodTruck,
            location,
            newPassword,
            profileImg,
            username,
          });

          if (res.error) {
            let error = 'Update failed, please try again later!';
            if (res.payload.response && res.payload.response.code === 11000) {
              let match = res.payload.response.errmsg.match(/"(.*?)"/)[1];
              error = `${match} already in use!`;
            } else if (res.payload.response.error) {
              error = res.payload.response.error;
            } else if (res.payload.response.errors) {
              error = res.payload.response.errors.message;
            }

            this.props.updateAlert({
              bg: 'danger',
              msg: error,
            });
            this.props.show();
            throw new Error(error);
          }

          this.props.updateAlert({
            bg: 'success',
            msg: 'Account updated!',
          });
          this.props.show();
          return this.setState({ currentPassword: '' });
        } catch (err) {
          console.log(err);
          return;
        }
      }
    } catch (err) {
      this.setState({
        errors: {
          profileImg: 'Image link is invalid',
        },
      });
    }
  };

  validate = values => {
    let errors = {};

    if (!values.bio) {
      errors.bio = 'Enter your bio';
    }

    if (!values.email) {
      errors.email = 'Enter your email';
    }

    if (!values.location) {
      errors.location = 'Enter your location';
    }

    if (!values.profileImg) {
      errors.profileImg = 'Enter your image link';
    }

    if (!values.username) {
      errors.username = 'Enter your username';
    }

    return errors;
  };

  render() {
    const {
      bio,
      email,
      errors,
      isAFoodTruck,
      location,
      profileImg,
      username,
    } = this.state;

    const { alert, showModal } = this.props;

    return (
      <div className="AccountEdit text-left container my-1">
        {showModal ? (
          <Alert
            closeModal={() => {
              this.props.clearAlert();
              this.props.hide();
            }}
            msg={alert.msg}
            bg={alert.bg}
          />
        ) : (
          ''
        )}

        <div className="card bg-secondary text-white mb-3">
          <div className="card-body p-2">
            <h4 className="card-title mb-0">Edit User Account</h4>
          </div>
        </div>
        <div className="card bg-light">
          <div className="card-header">Basic Information</div>
          {this.props.appState.isFetching ? (
            <div className="card-body text-center">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            </div>
          ) : (
            <div className="card-body">
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-group row">
                  <label
                    htmlFor="profileImg"
                    className="col-sm-2 col-form-label"
                  >
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
                    <small className="text-danger">{errors.profileImg}</small>
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
                    <small className="text-danger">{errors.username}</small>
                  </div>
                </div>
                <div className="form-check">
                  <label className="form-check-label pl-0">
                    Food truck account?
                    <input
                      type="checkbox"
                      className="form-check-input ml-2"
                      id="isAFoodTruck"
                      onChange={this.handleChange}
                      checked={isAFoodTruck}
                    />
                  </label>
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
                    <small className="text-danger">{errors.email}</small>
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
                    <small className="text-danger">{errors.location}</small>
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
                    <small className="text-danger">{errors.bio}</small>
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
                data-target="#deleteModal"
              >
                <i className="fa fa-ban" aria-hidden="true" /> Delete account
              </button>
            </div>
          )}
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
                  aria-label="Close"
                >
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
                  data-dismiss="modal"
                >
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
  appState: state.appState,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteUser, updateUser }, dispatch);
};

let AccountEditWithAlert = addAlertProps(AccountEdit);

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountEditWithAlert
);
