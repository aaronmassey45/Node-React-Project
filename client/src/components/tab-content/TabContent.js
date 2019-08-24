import React from 'react';
import PropTypes from 'prop-types';

import './tab-content.styles.scss';

const TabContent = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

TabContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.array,
  ]),
};

export default TabContent;
