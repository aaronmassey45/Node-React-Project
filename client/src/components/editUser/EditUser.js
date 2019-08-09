import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Alert from '../Alert';
import Spinner from '../spinner/Spinner';
import addAlertProps from '../../HOCs/add-alert';
import DeleteAccount from './DeleteAccount';
import EditUserForm from '../edit-user-form/EditUserForm';

import UPDATE_USER from '../../mutations/UpdateUser';
import CURRENT_USER from '../../queries/CurrentUser';

import isValidUrl from '../../utils/isValidUrl';
import validateInputs from '../../utils/validateInputs';

const INITIAL_INPUTS_STATE = {
  bio: '',
  currentPassword: '',
  email: '',
  location: '',
  newPassword: '',
  profileImg: '',
  username: '',
};

const EditUser = ({
  alert,
  showModal,
  clearAlert,
  hide,
  updateAlert,
  show,
}) => {
  const [inputValues, setInputValues] = useState({ ...INITIAL_INPUTS_STATE });
  const [inputErrors, setInputErrors] = useState({});

  const [updateAccount] = useMutation(UPDATE_USER, {
    variables: { ...inputValues },
    onCompleted: () => {
      updateAndShowAlert({
        bg: 'success',
        msg: 'Account updated!',
      });

      setInputValues({
        ...inputValues,
        currentPassword: '',
        newPassword: '',
      });
    },
    onError: err => console.log(err),
  });

  const updateAndShowAlert = ({ bg, msg }) => {
    updateAlert({ bg, msg });
    show();
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    const {
      bio,
      currentPassword,
      email,
      location,
      profileImg,
      username,
    } = inputValues;

    if (!currentPassword) {
      updateAndShowAlert({
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
      setInputErrors(errors);
      return;
    }

    try {
      await isValidUrl(profileImg);
    } catch (err) {
      setInputErrors({
        profileImg: 'Image link is invalid',
      });

      return;
    }

    updateAccount();
  };

  const { loading } = useQuery(CURRENT_USER, {
    variables: { withEditingData: true },
    onCompleted: ({ me }) => {
      if (me) {
        setInputValues({
          ...inputValues,
          bio: me.bio,
          email: me.email,
          location: me.location,
          profileImg: me.profileImg,
          username: me.username,
        });
      }
    },
    notifyOnNetworkStatusChange: true,
  });

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
            handleChange={handleChange}
            values={inputValues}
            errors={inputErrors}
          />
          <button
            className="btn btn-danger text-white"
            data-toggle="modal"
            data-target="#deleteModal"
          >
            <i className="fa fa-ban" aria-hidden="true" /> Delete account
          </button>
        </div>
        <div className="card-footer text-right">
          <button
            className="btn btn-success"
            onClick={() => handleSubmit(updateAccount)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

EditUser.propTypes = {
  alert: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  updateAlert: PropTypes.func.isRequired,
};

export default addAlertProps(EditUser);
