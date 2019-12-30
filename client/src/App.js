import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { default as Navbar } from 'components/navbar/NavbarContainer';
import SideBar from 'components/side-bar/SideBar';
import Spinner from 'components/spinner/Spinner';
import CURRENT_USER from 'graphql/queries/CurrentUser';
import Routes from 'Routes';

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
