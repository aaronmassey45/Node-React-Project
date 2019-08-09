import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Spinner from '../../components/spinner/Spinner';

import SEND_CHOWT from '../../graphql/mutations/Chowt';
import GET_USERS_FEED from '../../graphql/queries/getUsersFeed';
import FETCH_USER from '../../graphql/queries/FetchUser';

import './chowt-submit-button.styles.scss';

const ChowtSubmitButton = ({ _onCompleted, disabled, handleSubmit }) => {
  const client = useApolloClient();
  const [sendChowt, { loading }] = useMutation(SEND_CHOWT, {
    update: (proxy, { data: { chowt } }) => onUpdate(proxy, chowt, client),
    onCompleted: _onCompleted,
  });

  return (
    <button
      id="chowt-submit-button"
      className="btn"
      onClick={() => handleSubmit(sendChowt)}
      disabled={disabled}
    >
      {loading && <Spinner />} Chowt
    </button>
  );
};

const onUpdate = (proxy, chowt, client) => {
  try {
    const userId = client.extract().ROOT_QUERY.me.id;
    const username = client.extract()[userId].username;

    const { user } = proxy.readQuery({
      query: FETCH_USER,
      variables: { username },
    });

    proxy.writeQuery({
      query: FETCH_USER,
      variables: { username },
      data: {
        user: { ...user, posts: [...user.posts.reverse(), chowt] },
      },
    });
  } catch (err) {
    console.log('Error updating FETCH_USER');
  }

  try {
    const { populateFeed } = proxy.readQuery({ query: GET_USERS_FEED });

    proxy.writeQuery({
      query: GET_USERS_FEED,
      data: { populateFeed: [chowt, ...populateFeed] },
    });
  } catch (err) {
    console.log('Error updating GET_USERS_FEED');
  }
};

ChowtSubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  _onCompleted: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ChowtSubmitButton;
