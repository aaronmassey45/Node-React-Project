import React from 'react';
import PropTypes from 'prop-types';

import { default as ChowtForm } from '../../components/chowt-form/ChowtFormContainer';

import './chowt-page.styles.scss';

const ChowtPage = ({ history }) => (
  <div id="chowt-page">
    <ChowtForm goBack={history.goBack} showHeader />
  </div>
);

ChowtPage.propTypes = { history: PropTypes.object.isRequired };

export default ChowtPage;
