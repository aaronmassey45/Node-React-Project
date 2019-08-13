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
  const {
    data: { me },
  } = useQuery(CURRENT_USER, { fetchPolicy: 'network-only' });
  const windowWidth = useWindowWidth();
  const shouldShowSideBar = windowWidth >= 992 && me;

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <main className="App d-flex">
          <Routes />
          {shouldShowSideBar && <SideBar />}
        </main>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
