import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';

import { default as Navbar } from './components/navbar/NavbarContainer';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import UnProtectedRoute from './components/HOCs/UnProtectedRoute';
import Spinner from './components/spinner/Spinner';
import CURRENT_USER from './queries/CurrentUser';

const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ChowtPage = lazy(() => import('./pages/chowt-page/ChowtPage'));
const UserPage = lazy(() => import('./pages/user-page/UserPage'));
const EditUser = lazy(() => import('./components/editUser/EditUser'));
const HomePage = lazy(() => import('./pages/home-page/HomePageContainer'));
const DirectMessagesPage = lazy(() =>
  import('./pages/direct-messages-page/DirectMessagesPage')
);
const NotificationsPage = lazy(() =>
  import('./pages/notifications-page/NotificationsPage')
);
const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./components/AuthForms/Login'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignUp = lazy(() => import('./components/AuthForms/Signup'));

const App = () => (
  <Query query={CURRENT_USER} fetchPolicy="network-only">
    {() => (
      <BrowserRouter>
        <Navbar />
        <main className="App">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <UnProtectedRoute
                path="/login"
                exact
                component={props => <Login {...props} />}
              />
              <UnProtectedRoute
                path="/signup"
                exact
                component={props => <SignUp {...props} />}
              />
              <ProtectedRoute
                path="/account/edit"
                exact
                component={props => <EditUser {...props} />}
              />
              <Route
                path="/users/account/:username"
                exact
                render={props => <UserPage {...props} />}
              />
              <ProtectedRoute
                path="/home"
                redirectTo="/"
                exact
                component={props => <HomePage {...props} />}
              />
              <Route
                path="/"
                exact
                render={props => <LandingPage {...props} />}
              />
              <Route path="/about" render={props => <AboutPage {...props} />} />
              <Route
                path="/notifications"
                render={props => <NotificationsPage {...props} />}
              />
              <Route
                path="/messages"
                render={props => <DirectMessagesPage {...props} />}
              />
              <Route
                path="/compose/chowt"
                render={props => <ChowtPage {...props} />}
              />
              <Route render={props => <NotFound {...props} />} />
            </Switch>
          </Suspense>
        </main>
      </BrowserRouter>
    )}
  </Query>
);

export default App;
