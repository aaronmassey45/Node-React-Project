import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';
import CURRENT_USER from '../../queries/CurrentUser';

const NavbarContainer = () => {
  const [renderIconsOnly, setRenderIconsOnly] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setRenderIconsOnly(true);
      } else {
        setRenderIconsOnly(false);
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Query query={CURRENT_USER} onError={err => console.log(err)}>
      {({ data = {} }) => {
        const navButtons = data.me ? (
          <AuthedButtons
            currentUser={data.me}
            renderIconsOnly={renderIconsOnly}
          />
        ) : (
          <UnauthedButtons renderIconsOnly={renderIconsOnly} />
        );

        return (
          <Navbar navButtons={navButtons} renderIconsOnly={renderIconsOnly} />
        );
      }}
    </Query>
  );
};

export default NavbarContainer;
