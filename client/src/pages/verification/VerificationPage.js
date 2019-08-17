import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../../components/spinner/Spinner';
import VERIFY_USER_ACCOUNT from '../../graphql/queries/verifyUserAccount';

import './verification-page.styles.scss';

const VerificationPage = ({ location }) => {
  const { username, token } = queryString.parse(location.search);
  const { data, loading, error } = useQuery(VERIFY_USER_ACCOUNT, {
    variables: { username, token },
  });

  if (loading) return <Spinner />;

  let errors = [];
  if (error) {
    errors = error.graphQLErrors.map(error => error.message);
  }

  if (
    errors.includes('You have already verified your email!') ||
    data.verifyUserAccount === 'Success'
  ) {
    return <Redirect to={`/users/account/${username}`} />;
  }

  return (
    <div id="verification-page">
      {errors.map((error, i) => {
        return <h2 key={`verificationError_${i}`}>{error.message}</h2>;
      })}
    </div>
  );
};

VerificationPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default VerificationPage;
