import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

import SearchForm from './search/SearchForm';
import SearchResults from './search/SearchResults';
import Spinner from '../../components/spinner/Spinner';
import WhoToFollow from '../../components/who-to-follow/WhoToFollow';
import CURRENT_USER from '../../graphql/queries/CurrentUser';
import SEARCH from '../../graphql/queries/search';
import useWindowWidth from '../../react-hooks/useWindowWidth';

import './discover.styles.scss';

const DiscoverPage = () => {
  const [searchQuery, { called, loading, data }] = useLazyQuery(SEARCH);
  const {
    data: { currentUser },
  } = useQuery(CURRENT_USER, { fetchPolicy: 'cache-only' });
  const windowWidth = useWindowWidth();

  const shouldShow = currentUser && currentUser.me && windowWidth <= 992;

  const renderContent = () => {
    if (called && !loading) {
      return <SearchResults results={data.search} />;
    } else if (called && loading) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  return (
    <div id="discover-page">
      <h2>Explore Chowster</h2>
      <SearchForm searchQuery={searchQuery} />
      {renderContent()}
      {shouldShow && <WhoToFollow />}
    </div>
  );
};

export default DiscoverPage;
