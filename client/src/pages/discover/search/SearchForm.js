import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Searchbar from './Searchbar';

const SearchForm = ({ searchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue) return;
    searchQuery({ variables: { searchTerm: inputValue } });
    document.getElementById('searchbar').blur();
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <Searchbar handleChange={handleInputChange} value={inputValue} />
    </form>
  );
};

SearchForm.propTypes = {
  searchQuery: PropTypes.func.isRequired,
};

export default SearchForm;
