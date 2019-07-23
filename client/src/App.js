import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { default as Navbar } from './components/navbar/NavbarContainer';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import FloatingChowt from './components/ChowtModal';
const EditUser = lazy(() => import('./components/editUser/EditUser'));
const HomePage = lazy(() => import('./components/Homepage'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./components/AuthForms/Login'));
const NotFound = lazy(() => import('./components/NotFound'));
const SignUp = lazy(() => import('./components/AuthForms/Signup'));
const User = lazy(() => import('./components/User'));

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className="mt-app">
        <Suspense fallback={<div />}>
          <Switch>
            <Route
              path="/login"
              exact
              component={props => <Login {...props} />}
            />
            <ProtectedRoute
              path="/account/edit"
              exact
              component={props => <EditUser {...props} />}
            />
            <Route
              path="/users/account/:username"
              exact
              component={props => <User {...props} />}
            />
            <Route
              path="/signup"
              exact
              component={props => <SignUp {...props} />}
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
              component={props => <LandingPage {...props} />}
            />
            <Route component={props => <NotFound {...props} />} />
          </Switch>
        </Suspense>
        <FloatingChowt />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
