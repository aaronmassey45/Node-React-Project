import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import Alert from '../Alert';
import Spinner from '../spinner/Spinner';
import addAlertProps from '../HOCs/add-alert';
import DeleteAccount from './DeleteAccount';
import EditUserForm from '../edit-user-form/EditUserForm';

import UPDATE_USER from '../../mutations/UpdateUser';
import CURRENT_USER from '../../queries/CurrentUser';

import isValidUrl from '../../utils/isValidUrl';
import validateInputs from '../../utils/validateInputs';

class EditUser extends PureComponent {
  state = {
    bio: '',
    currentPassword: '',
    email: '',
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

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async updateAccount => {
    const {
      bio,
      currentPassword,
      email,
      location,
      profileImg,
      username,
    } = this.state;

    if (!currentPassword) {
      this.updateAndShowAlert({
        bg: 'warning',
        msg: 'You must enter your current password!',
      });
      return;
    }

    const errors = validateInputs({
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
      this.setState({
        errors: {
          profileImg: 'Image link is invalid',
        },
      });

      return;
    }

    updateAccount({ variables: { ...this.state } });
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
            location: me.location,
            profileImg: me.profileImg,
            username: me.username,
          }));
        }}
        notifyOnNetworkStatusChange
      >
        {({ loading }) => {
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
                  <EditUserForm
                    handleChange={this.handleChange}
                    values={this.state}
                    errors={this.state.errors}
                  />
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
                  <Mutation
                    mutation={UPDATE_USER}
                    onCompleted={() => {
                      this.updateAndShowAlert({
                        bg: 'success',
                        msg: 'Account updated!',
                      });

                      this.setState({
                        ...this.state,
                        currentPassword: '',
                        newPassword: '',
                        errors: {},
                      });
                    }}
                    onError={err => console.log(err)}
                  >
                    {updateAccount => (
                      <button
                        className="btn btn-success"
                        onClick={() => this.handleSubmit(updateAccount)}
                      >
                        Update
                      </button>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

EditUser.propTypes = {
  alert: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  updateAlert: PropTypes.func.isRequired,
};

export default addAlertProps(EditUser);
