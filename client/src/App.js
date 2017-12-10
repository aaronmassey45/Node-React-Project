import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AccountEdit from './components/users-edit';
import HomePage from './components/homepage';
import Login from './components/login';
import MyAccount from './components/users-me';
import Navbar from './components/navbar';
import NotFound from './components/notfound';
import SignUp from './components/signup';
import UserPage from './components/users-page';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="mt-app container">
            <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/users/account/edit' exact component={AccountEdit} />
              <Route path='/users/account/:username' exact component={UserPage} />
              <Route path='/users/me' exact component={MyAccount} />
              <Route path='/signup' exact component={SignUp} />
              <Route path='/' exact component={HomePage} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
