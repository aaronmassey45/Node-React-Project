import React from 'react';
import PropTypes from 'prop-types';

import './tab-content.styles.scss';

const TabContentV2 = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

TabContentV2.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

export default TabContentV2;
