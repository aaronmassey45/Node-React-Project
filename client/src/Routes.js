import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './HOCs/ProtectedRoute';
import UnProtectedRoute from './HOCs/UnProtectedRoute';

const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ChowtPage = lazy(() => import('./pages/chowt-page/ChowtPage'));
const UserPage = lazy(() => import('./pages/user-page/UserPage'));
const EditUserPage = lazy(() => import('./pages/edit-user-page/EditUserPage'));
const HomePage = lazy(() => import('./pages/home-page/HomePageContainer'));
const DirectMessagesPage = lazy(() =>
  import('./pages/direct-messages-page/DirectMessagesPage')
);
const NotificationsPage = lazy(() =>
  import('./pages/notifications-page/NotificationsPage')
);
const LandingPage = lazy(() => import('./pages/landing-page/LandingPage'));
const Login = lazy(() => import('./components/auth-forms/Login'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignUp = lazy(() => import('./components/auth-forms/Signup'));
const FollowersPage = lazy(() =>
  import('./pages/followers-page/FollowersPage')
);

const Routes = () => {
  return (
    <div id="primary-column">
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
          component={props => <EditUserPage {...props} />}
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
        <UnProtectedRoute
          path="/"
          exact
          component={props => <LandingPage {...props} />}
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
        <Route
          path={['/:username/followers', '/:username/following']}
          render={props => <FollowersPage {...props} />}
        />
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    </div>
  );
};

export default Routes;
