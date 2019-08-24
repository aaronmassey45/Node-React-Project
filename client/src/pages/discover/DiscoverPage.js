import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import SearchForm from './search/SearchForm';
import SearchResults from './search/SearchResults';
import SEARCH from '../../graphql/queries/search';

import './discover.styles.scss';

const DiscoverPage = () => {
  const [searchQuery, { called, loading, data }] = useLazyQuery(SEARCH);

  return (
    <div id="discover-page">
      <h2>Explore Chowster</h2>
      <SearchForm searchQuery={searchQuery} />
      {called && !loading ? <SearchResults results={data.search} /> : null}
    </div>
  );
};

export default DiscoverPage;
