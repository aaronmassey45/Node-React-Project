import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { default as Navbar } from './components/navbar/NavbarContainer';
import Routes from './Routes';
import SideBar from './components/side-bar/SideBar';
import Spinner from './components/spinner/Spinner';

import CURRENT_USER from './graphql/queries/CurrentUser';

const App = () => {
  const { loading, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<main />}>
        <main className="App flex">
          {!loading ? (
            <>
              <Routes />
              <SideBar isLoggedIn={!!data?.me} />
            </>
          ) : (
            <Spinner />
          )}
        </main>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
