import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './HOCs/ProtectedRoute';
import UnProtectedRoute from './HOCs/UnProtectedRoute';

const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ChowtPage = lazy(() => import('./pages/chowt-page/ChowtPage'));
const DirectMessagesPage = lazy(() =>
  import('./pages/direct-messages-page/DirectMessagesPage')
);
const DiscoverPage = lazy(() => import('./pages/discover/DiscoverPage'));
const EditUserPage = lazy(() => import('./pages/edit-user-page/EditUserPage'));
const FollowersPage = lazy(() =>
  import('./pages/followers-page/FollowersPage')
);
const HomePage = lazy(() => import('./pages/home-page/HomePageContainer'));
const LandingPage = lazy(() => import('./pages/landing-page/LandingPage'));
const Login = lazy(() => import('./components/auth-forms/Login'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const NotificationsPage = lazy(() =>
  import('./pages/notifications-page/NotificationsPage')
);
const SignUp = lazy(() => import('./components/auth-forms/Signup'));
const UserPage = lazy(() => import('./pages/user-page/UserPage'));
const VerificationPage = lazy(() =>
  import('./pages/verification/VerificationPage')
);

const Routes = () => {
  return (
    <div id="primary-column">
      <Switch>
        <UnProtectedRoute
          path="/"
          exact
          component={props => <LandingPage {...props} />}
        />
        <Route path="/about" render={props => <AboutPage {...props} />} />
        <ProtectedRoute
          path="/account/edit"
          exact
          component={props => <EditUserPage {...props} />}
        />
        <Route
          path="/compose/chowt"
          render={props => <ChowtPage {...props} />}
        />
        <Route path="/discover" render={props => <DiscoverPage {...props} />} />
        <ProtectedRoute
          path="/home"
          redirectTo="/"
          exact
          component={props => <HomePage {...props} />}
        />
        <UnProtectedRoute
          path="/login"
          exact
          component={props => <Login {...props} />}
        />
        <Route
          path="/messages"
          render={props => <DirectMessagesPage {...props} />}
        />
        <Route
          path="/notifications"
          render={props => <NotificationsPage {...props} />}
        />
        <UnProtectedRoute
          path="/signup"
          exact
          component={props => <SignUp {...props} />}
        />
        <Route
          path="/users/account/:username"
          exact
          render={props => <UserPage {...props} />}
        />
        <Route
          path={['/:username/followers', '/:username/following']}
          render={props => <FollowersPage {...props} />}
        />
        <Route
          path="/verification"
          render={props => <VerificationPage {...props} />}
        />
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    </div>
  );
};

export default Routes;
