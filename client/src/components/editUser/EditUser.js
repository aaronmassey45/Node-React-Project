import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteUser, updateUser } from '../../store/actions/userActions';
import Alert from '../alert';
import addAlertProps from '../HOCs/add-alert';
import InputField from './InputField';
import DeleteAccount from './DeleteAccount';

const FIELDS = [
  {
    label: 'Username*',
    name: 'username',
    type: 'text',
  },
  {
    label: 'Email*',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Location*',
    name: 'location',
    type: 'text',
  },
  {
    label: 'URL for Profile Pic*',
    name: 'profileImg',
    type: 'text',
  },
  {
    label: 'Is account a food truck?*',
    name: 'isAFoodTruck',
    type: 'checkbox',
  },
  {
    label: 'Bio*',
    name: 'bio',
    type: 'textarea',
  },
  {
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
  },
  {
    label: 'Current Password',
    name: 'currentPassword',
    type: 'password',
  },
];

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

  updateAndShowAlert = ({ bg, msg }) => {
    this.props.updateAlert({ bg, msg });
    this.props.show();
  };

  deleteAccount = async () => {
    try {
      await this.props.deleteUser();
      this.props.history.push('/');
    } catch (err) {
      this.updateAndShowAlert({
        bg: 'danger',
        msg: 'Could not delete account. Try again later.',
      });
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
    if (e.target.name === 'isAFoodTruck')
      return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    const {
      checkUrl,
      setState,
      updateAndShowAlert,
      validate,
      props: { updateUser },
      state: {
        bio,
        currentPassword,
        email,
        isAFoodTruck,
        location,
        newPassword,
        profileImg,
        username,
      },
    } = this;

    if (!currentPassword) {
      return updateAndShowAlert({
        bg: 'warning',
        msg: 'You must enter your current password!',
      });
    }

    const errors = validate({
      bio,
      email,
      location,
      profileImg,
      username,
    });

    if (Object.keys(errors).length) {
      return setState({
        ...this.state,
        errors,
      });
    }

    try {
      await checkUrl(profileImg);
    } catch (err) {
      return setState({
        errors: {
          profileImg: 'Image link is invalid',
        },
      });
    }

    try {
      const res = await updateUser({
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
          const match = res.payload.response.errmsg.match(/"(.*?)"/)[1];
          error = `${match} already in use!`;
        } else if (res.payload.response.error) {
          error = res.payload.response.error;
        } else if (res.payload.response.errors) {
          error = res.payload.response.errors.message;
        }

        updateAndShowAlert({ bg: 'danger', msg: error });
        throw new Error(error);
      }

      updateAndShowAlert({ bg: 'success', msg: 'Account updated!' });
      return setState({ currentPassword: '', errors: {} });
    } catch (err) {
      return console.log(err);
    }
  };

  validate = values => {
    const errors = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] =
          key === 'profileImg' ? 'Enter your image link' : `Enter your ${key}`;
      }
    });

    return errors;
  };

  renderFields = () => {
    return FIELDS.map(({ label, name, type }) => {
      return (
        <InputField
          key={name}
          label={label}
          name={name}
          type={type}
          handleChange={this.handleChange}
          value={this.state[name]}
          error={this.state.errors[name]}
        />
      );
    });
  };

  render() {
    const { alert, showModal, clearAlert, hide, appState } = this.props;

    return (
      <div className="AccountEdit text-left container my-1">
        <DeleteAccount deleteUser={this.deleteAccount} />
        {showModal && (
          <Alert
            closeModal={() => {
              clearAlert();
              hide();
            }}
            msg={alert.msg}
            bg={alert.bg}
          />
        )}

        <div className="card bg-secondary text-white mb-3">
          <div className="card-body p-2">
            <h4 className="card-title mb-0">Edit User Account</h4>
          </div>
        </div>
        <div className="card bg-light">
          <div className="card-header">Basic Information</div>
          {appState.isFetching ? (
            <div className="card-body text-center">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            </div>
          ) : (
            <div className="card-body">
              <form onSubmit={e => e.preventDefault()}>
                {this.renderFields()}
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

const AccountEditWithAlert = addAlertProps(AccountEdit);

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountEditWithAlert
);
