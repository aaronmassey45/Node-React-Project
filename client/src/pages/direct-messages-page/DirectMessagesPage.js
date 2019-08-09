import React from 'react';
import PropTypes from 'prop-types';

import UnderDevelopment from '../../components/under-development/UnderDevelopment';

const DirectMessagesPage = ({ history }) => (
  <div id="notifications-page">
    <UnderDevelopment goBack={history.goBack} page="Direct Messages" />
  </div>
);

DirectMessagesPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default DirectMessagesPage;
