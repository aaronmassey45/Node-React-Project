import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { default as Navbar } from './components/navbar/NavbarContainer';
import Routes from './Routes';
import SideBar from './components/side-bar/SideBar';
import Spinner from './components/spinner/Spinner';

import useWindowWidth from './react-hooks/useWindowWidth';

import CURRENT_USER from './graphql/queries/CurrentUser';

const App = () => {
  const { loading, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });
  const windowWidth = useWindowWidth();
  const shouldShowSideBar = windowWidth >= 992 && data.me;

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        {!loading ? (
          <main className="App d-flex">
            <Routes />
            {shouldShowSideBar && <SideBar />}
          </main>
        ) : (
          <Spinner />
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
