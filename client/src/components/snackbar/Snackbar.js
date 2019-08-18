import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import './snackbar.styles.scss';

const Snackbar = ({ message, isShown }) => {
  return ReactDOM.createPortal(
    <div id="snackbar" className={isShown ? 'show' : ''}>
      {message}
    </div>,
    document.getElementById('snackbar-root')
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default Snackbar;
