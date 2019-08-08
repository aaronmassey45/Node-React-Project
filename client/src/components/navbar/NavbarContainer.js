import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Navbar from './Navbar';

import CURRENT_USER from '../../queries/CurrentUser';

const NavbarContainer = () => {
  const { data = {} } = useQuery(CURRENT_USER);
  return <Navbar currentUser={data.me || {}} />;
};

export default NavbarContainer;
