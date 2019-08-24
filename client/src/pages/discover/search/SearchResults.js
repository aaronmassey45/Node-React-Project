import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Post from '../../../components/post/Post';
import UserListItem from '../../../components/user-list-item/UserListItem';
import CURRENT_USER from '../../../graphql/queries/CurrentUser';

const SearchResults = ({ results }) => {
  const { data } = useQuery(CURRENT_USER);

  return results.length > 0 ? (
    <div className="list-item-group">
      {results
        .map(obj => {
          switch (obj.__typename) {
            case 'User':
              return (
                <UserListItem
                  key={obj.id}
                  user={obj}
                  currentUser={data.me || {}}
                />
              );
            case 'Post':
              return (
                <div className="list-item" key={obj.id}>
                  <Post me={data.me || {}} post={obj} profile={obj._creator} />
                </div>
              );
            default:
              return null;
          }
        })
        .filter(component => !!component)}
    </div>
  ) : (
    <div>No search results found!</div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
