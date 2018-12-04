import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/HOCs/ProtectedRoute';
import EditUser from './components/editUser/EditUser';
import FloatingChowt from './components/ChowtModal';
import HomePage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/NotFound';
import SignUp from './components/Signup';
import User from './components/User';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className="mt-app">
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/account/edit" exact component={EditUser} />
          <Route path="/users/account/:username" exact component={User} />
          <Route path="/signup" exact component={SignUp} />
          <ProtectedRoute
            path="/feed"
            redirectTo="/"
            exact
            component={HomePage}
          />
          <Route path="/" exact component={LandingPage} />
          <Route path="*" component={NotFound} />
        </Switch>
        <FloatingChowt />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
