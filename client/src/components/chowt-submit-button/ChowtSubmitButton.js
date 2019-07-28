import React from 'react';
import { Mutation } from 'react-apollo';

import Spinner from '../../components/spinner/Spinner';

import SEND_CHOWT from '../../mutations/Chowt';
import GET_POSTS from '../../queries/GetPosts';

import './chowt-submit-button.styles.scss';

const ChowtSubmitButton = ({ history, disabled, handleSubmit }) => {
  return (
    <Mutation
      mutation={SEND_CHOWT}
      onCompleted={history.goBack}
      refetchQueries={[{ query: GET_POSTS }]}
      awaitRefetchQueries
    >
      {(sendChowt, { loading }) => (
        <button
          id="chowt-submit-button"
          className="btn"
          onClick={() => handleSubmit(sendChowt)}
          disabled={disabled}
        >
          {loading && <Spinner />} Chowt
        </button>
      )}
    </Mutation>
  );
};

export default ChowtSubmitButton;
