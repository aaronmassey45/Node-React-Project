import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
              <Route path='/login' component={Login} />
              <Route path='/users/account/:username' component={UserPage} />
              <Route path='/users/me' component={MyAccount} />
              <Route path='/signup' component={SignUp} />
              <Route path='/' exact component={HomePage} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
