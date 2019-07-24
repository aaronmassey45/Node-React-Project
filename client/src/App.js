import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { default as Navbar } from './components/navbar/NavbarContainer';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import FloatingChowt from './components/ChowtModal';
import Spinner from './components/spinner/Spinner';
const EditUser = lazy(() => import('./components/editUser/EditUser'));
const HomePage = lazy(() => import('./components/Homepage'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./components/AuthForms/Login'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignUp = lazy(() => import('./components/AuthForms/Signup'));
const User = lazy(() => import('./components/User'));

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
              render={props => <EditUser {...props} />}
            />
            <Route
              path="/users/account/:username"
              exact
              render={props => <User {...props} />}
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
              render={props => <HomePage {...props} />}
            />
            <Route
              path="/"
              exact
              render={props => <LandingPage {...props} />}
            />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </Suspense>
        <FloatingChowt />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
