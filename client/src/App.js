import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import requireAuth from './components/HOCs/requireAuth';
import EditUser from './components/editUser/EditUser';
import FloatingChowt from './components/chowt-modal';
import HomePage from './components/homepage';
import Login from './components/login';
import MyAccount from './components/users-me';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/notfound';
import SignUp from './components/signup';
import UserPage from './components/users-page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="mt-app">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route
                path="/users/account/edit"
                exact
                component={requireAuth(EditUser)}
              />
              <Route
                path="/users/account/:username"
                exact
                component={UserPage}
              />
              <Route
                path="/users/me"
                exact
                component={requireAuth(MyAccount)}
              />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NotFound} />
            </Switch>
            {this.props.appState.loggedIn ? <FloatingChowt /> : ''}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
});

export default connect(mapStateToProps)(App);
