import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import DeleteAccount from '../../components/delete-account/DeleteAccount';
import EditUserForm from '../../components/edit-user-form/EditUserForm';
import Snackbar from '../../components/snackbar/Snackbar';
import Spinner from '../../components/spinner/Spinner';
import CURRENT_USER from '../../graphql/queries/CurrentUser';
import UPDATE_USER from '../../graphql/mutations/UpdateUser';
import useSnackbar from '../../react-hooks/useSnackbar';
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

const EditUser = () => {
  const [inputValues, setInputValues] = useState({ ...INITIAL_INPUTS_STATE });
  const [inputErrors, setInputErrors] = useState({});
  const { isShown, message, setMessageAndShowSnackbar } = useSnackbar();

  const [updateAccount] = useMutation(UPDATE_USER, {
    variables: { ...inputValues },
    onCompleted: () => {
      setMessageAndShowSnackbar('Account successfully updated.');

      setInputValues({
        ...inputValues,
        currentPassword: '',
        newPassword: '',
      });
    },
    onError: err => console.log(err),
  });

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
      setMessageAndShowSnackbar('You must enter your current password!');
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
    <>
      <div className="AccountEdit text-left container my-1">
        <DeleteAccount />
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
      <Snackbar message={message} isShown={isShown} />
    </>
  );
};

export default EditUser;
