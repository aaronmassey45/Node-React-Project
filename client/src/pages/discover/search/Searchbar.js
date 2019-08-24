import React from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ handleChange, value }) => {
  return (
    <input
      id="searchbar"
      onChange={handleChange}
      placeholder="Search Chowster..."
      type="text"
      value={value}
    />
  );
};

Searchbar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Searchbar;
