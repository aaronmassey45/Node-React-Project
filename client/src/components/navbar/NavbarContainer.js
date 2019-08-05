import React from 'react';
import { Query } from 'react-apollo';

import Navbar from './Navbar';

import CURRENT_USER from '../../queries/CurrentUser';

const NavbarContainer = () => (
  <Query query={CURRENT_USER} onError={err => console.log(err)}>
    {({ data = {} }) => {
      return <Navbar currentUser={data.me || {}} />;
    }}
  </Query>
);

export default NavbarContainer;
