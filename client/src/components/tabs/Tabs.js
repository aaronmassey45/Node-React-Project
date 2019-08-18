import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import capitalizeString from '../../utils/capitalizeString';

import './tabs.styles.scss';

const Tabs = ({ linkNames, defaultTab, username }) => {
  const initialTab = defaultTab || linkNames[0];
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="tab">
      {linkNames.map(linkName => {
        const classes = classNames('tab-link', {
          active: activeTab === linkName,
        });

        return (
          <Link
            key={linkName}
            id={`tab-link__${linkName}`}
            className={classes}
            onClick={() => setActiveTab(linkName)}
            to={`/${username}/${linkName}`}
          >
            {capitalizeString(linkName)}
          </Link>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  linkNames: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Tabs;
