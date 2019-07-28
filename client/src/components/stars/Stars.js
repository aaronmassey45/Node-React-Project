import React from 'react';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import { Mutation } from 'react-apollo';

import RATE_ACCOUNT from '../../mutations/rateAccount';

import './stars.styles.scss';

const Stars = ({ interactive, average, id }) => {
  return (
    <div id="stars-container">
      <Mutation mutation={RATE_ACCOUNT} onError={err => console.log(err)}>
        {rateAccount => (
          <Rater
            total={5}
            onRate={rate => rateUser(rate, rateAccount, id)}
            rating={average}
            interactive={interactive}
          />
        )}
      </Mutation>
      <small id="stars-average">Rated {average || 0} out of 5!</small>
    </div>
  );
};

const rateUser = ({ type, rating }, rateAccount, id) => {
  if (type === 'click') {
    rateAccount({ variables: { id, rating } });
  }
};

Stars.propTypes = {
  average: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};

export default Stars;
