import React from 'react';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './tab-content.styles.scss';

const TabContent = ({ loading = false, users }) => {
  if (loading) return <Spinner />;

  return (
    <div className="tab-content">
      {users.map(user => (
        <div key={user.username} className="list-item">
          <div className="img-container">
            <img src={user.profileImg} alt={user.username} />
          </div>
          <div className="content-body">
            <Link to={`/users/account/${user.username}`}>@{user.username}</Link>
            <div>{user.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

TabContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

export default TabContent;
