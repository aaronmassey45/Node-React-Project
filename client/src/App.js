import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { default as Navbar } from './components/navbar/NavbarContainer';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import ComposeChowtLink from './components/compose-chowt-link/ComposeChowtLink';
import Spinner from './components/spinner/Spinner';

const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ChowtPage = lazy(() => import('./pages/chowt-page/ChowtPage'));
const UserPage = lazy(() => import('./pages/user-page/UserPage'));
const EditUser = lazy(() => import('./components/editUser/EditUser'));
const HomePage = lazy(() => import('./components/Homepage'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./components/AuthForms/Login'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignUp = lazy(() => import('./components/AuthForms/Signup'));

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className="mt-app">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/login" exact render={props => <Login {...props} />} />
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
            <Route
              path="/signup"
              exact
              render={props => <SignUp {...props} />}
            />
            <ProtectedRoute
              path="/feed"
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
              path="/compose/chowt"
              render={props => <ChowtPage {...props} />}
            />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </Suspense>
        <ComposeChowtLink />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
