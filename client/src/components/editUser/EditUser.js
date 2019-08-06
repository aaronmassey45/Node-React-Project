import React, { PureComponent } from 'react';
import { graphql, compose, Query } from 'react-apollo';

import Alert from '../Alert';
import Spinner from '../spinner/Spinner';
import addAlertProps from '../HOCs/add-alert';
import InputField from './InputField';
import DeleteAccount from './DeleteAccount';
import mutation from '../../mutations/UpdateUser';
import FIELDS from './form-fields';
import CURRENT_USER from '../../queries/CurrentUser';
import isValidUrl from '../../utils/isValidUrl';

class AccountEdit extends PureComponent {
  state = {
    bio: '',
    currentPassword: '',
    email: '',
    isAFoodTruck: false,
    errors: {},
    location: '',
    newPassword: '',
    profileImg: '',
    username: '',
  };

  updateAndShowAlert = ({ bg, msg }) => {
    this.props.updateAlert({ bg, msg });
    this.props.show();
  };

  handleChange = e => {
    if (e.target.name === 'isAFoodTruck') {
      return this.setState(prevState => ({
        isAFoodTruck: !prevState.isAFoodTruck,
      }));
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    const {
      updateAndShowAlert,
      validate,
      state: { bio, currentPassword, email, location, profileImg, username },
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
      return this.setState({ ...this.state, errors });
    }

    try {
      await isValidUrl(profileImg);
    } catch (err) {
      return this.setState({
        errors: {
          profileImg: 'Image link is invalid',
        },
      });
    }

    try {
      await this.props.mutate({ variables: { ...this.state } });
      updateAndShowAlert({ bg: 'success', msg: 'Account updated!' });
      return this.setState({
        ...this.state,
        currentPassword: '',
        newPassword: '',
        errors: {},
      });
    } catch (err) {
      console.log(err);
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
    const { alert, showModal, clearAlert, hide } = this.props;

    return (
      <Query
        query={CURRENT_USER}
        variables={{ withEditingData: true }}
        onCompleted={({ me }) => {
          this.setState(prevState => ({
            ...prevState,
            bio: me.bio,
            email: me.email,
            isAFoodTruck: me.isAFoodTruck,
            location: me.location,
            profileImg: me.profileImg,
            username: me.username,
          }));
        }}
        notifyOnNetworkStatusChange
      >
        {({ loading, data }) => {
          return loading ? (
            <Spinner />
          ) : (
            <div className="AccountEdit text-left container my-1">
              <DeleteAccount />
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
                <div className="card-body">
                  <form onSubmit={e => e.preventDefault()}>
                    {this.renderFields()}
                  </form>
                  <button
                    className="btn btn-danger text-white"
                    data-toggle="modal"
                    data-target="#deleteModal"
                  >
                    <i className="fa fa-ban" aria-hidden="true" /> Delete
                    account
                  </button>
                </div>
                <div className="card-footer text-right">
                  <button
                    className="btn btn-success"
                    onClick={this.handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  addAlertProps,
  graphql(mutation)
)(AccountEdit);
