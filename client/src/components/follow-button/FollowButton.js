import React, { useState, Fragment } from 'react';
import classNames from 'classnames';

import './follow-button.styles.scss';

const FollowButton = () => {
  const [following, setFollowingState] = useState(false);
  const btnClasses = classNames('follow-button', 'btn', {
    'btn-success': following,
    'btn-primary': !following,
  });

  return (
    <button
      className={btnClasses}
      onClick={() => setFollowingState(!following)}
    >
      {following ? (
        <Fragment>
          Following <i className="fas fa-check"></i>
        </Fragment>
      ) : (
        <Fragment>
          Follow <i className="fas fa-user-plus"></i>
        </Fragment>
      )}
    </button>
  );
};

export default FollowButton;
