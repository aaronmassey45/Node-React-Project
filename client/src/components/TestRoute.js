import React, { Component } from 'react';

class TestRoute extends Component {
  state = {users: []}

  async componentDidMount() {
    let res = await fetch('/users');
    let users = await res.json();
    this.setState({ users });
  }

  render() {
    return (
      <div className="TestRoute">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default TestRoute;
