import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import capitalizeString from '../../utils/capitalizeString';

import './tabs.styles.scss';

const TabsV2 = ({ tabNames, handleClick, activeTab }) => {
  return (
    <div className="tab">
      {tabNames.map(tabName => {
        const classes = classnames('tab-link', {
          active: tabName === activeTab,
        });
        return (
          <button
            className={classes}
            id={`tab-link__${tabName}`}
            key={tabName}
            onClick={() => handleClick(tabName)}
          >
            {capitalizeString(tabName)}
          </button>
        );
      })}
    </div>
  );
};

TabsV2.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TabsV2;
