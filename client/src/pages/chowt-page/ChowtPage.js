import React from 'react';

import { default as ChowtForm } from '../../components/chowt-form/ChowtFormContainer';

import './chowt-page.styles.scss';

const ChowtPage = ({ history }) => (
  <div id="chowt-page">
    <ChowtForm goBack={history.goBack} showHeader />
  </div>
);

export default ChowtPage;
