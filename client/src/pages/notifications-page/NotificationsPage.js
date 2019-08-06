import React from 'react';
import PropTypes from 'prop-types';

import UnderDevelopment from '../../components/under-development/UnderDevelopment';

const NotificationsPage = ({ history }) => (
  <div id="notifications-page">
    <UnderDevelopment goBack={history.goBack} page="Notifications" />
  </div>
);

NotificationsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NotificationsPage;
