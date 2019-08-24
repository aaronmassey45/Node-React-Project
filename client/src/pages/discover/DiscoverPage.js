import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import SearchForm from './search/SearchForm';
import SearchResults from './search/SearchResults';
import WhoToFollow from '../../components/who-to-follow/WhoToFollow';
import SEARCH from '../../graphql/queries/search';
import useWindowWidth from '../../react-hooks/useWindowWidth';

import './discover.styles.scss';

const DiscoverPage = () => {
  const [searchQuery, { called, loading, data }] = useLazyQuery(SEARCH);
  const windowWidth = useWindowWidth();

  return (
    <div id="discover-page">
      <h2>Explore Chowster</h2>
      <SearchForm searchQuery={searchQuery} />
      {called && !loading ? <SearchResults results={data.search} /> : null}
      {windowWidth <= 992 && <WhoToFollow />}
    </div>
  );
};

export default DiscoverPage;
