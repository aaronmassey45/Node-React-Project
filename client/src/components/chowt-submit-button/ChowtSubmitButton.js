import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import Spinner from '../../components/spinner/Spinner';

import SEND_CHOWT from '../../mutations/Chowt';
import GET_USERS_FEED from '../../queries/getUsersFeed';
import FETCH_USER from '../../queries/FetchUser';

import './chowt-submit-button.styles.scss';

const ChowtSubmitButton = ({ history, disabled, handleSubmit, client }) => (
  <Mutation
    mutation={SEND_CHOWT}
    onCompleted={history.goBack}
    update={(proxy, { data: { chowt } }) => onUpdate(proxy, chowt, client)}
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
  client: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withApollo(ChowtSubmitButton);
