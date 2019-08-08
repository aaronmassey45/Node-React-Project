import React from 'react';
import Rater from 'react-rater';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import RATE_ACCOUNT from '../../mutations/rateAccount';

import './stars.styles.scss';

const Stars = ({ interactive, average, id }) => {
  const [rateAccount] = useMutation(RATE_ACCOUNT);

  return (
    <div id="stars-container">
      <Rater
        total={5}
        onRate={({ type, rating }) => {
          if (type === 'click') {
            rateAccount({ variables: { id, rating } });
          }
        }}
        rating={average}
        interactive={interactive}
      />
      <small id="stars-average">Rated {average || 0} out of 5!</small>
    </div>
  );
};

Stars.propTypes = {
  average: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};

export default Stars;
