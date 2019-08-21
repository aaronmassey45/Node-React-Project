import React from 'react';
import PropTypes from 'prop-types';

import useWindowWidth from '../../react-hooks/useWindowWidth';
import WhoToFollow from '../who-to-follow/WhoToFollow';

import './side-bar.styles.scss';

const SideBar = ({ isLoggedIn }) => {
  const windowWidth = useWindowWidth();
  const shouldShow = isLoggedIn && windowWidth >= 992;

  return shouldShow ? (
    <aside id="side-bar">
      <WhoToFollow />
    </aside>
  ) : null;
};

SideBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SideBar;
