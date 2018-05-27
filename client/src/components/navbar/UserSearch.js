import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
  state = { value: '' };

  searchUser = async e => {
    e.preventDefault();
    const { value } = this.state;
    if (!value) return null;

    try {
      const users = await axios.get('/api/userlist');
      const foundUser = users.data.find(user => user.username === value);
      if (!foundUser) return alert(`No user found: ${value}`);
      this.props.history.push(`/users/account/${foundUser.username}`);
      this.setState({ value: '' });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <form
        className="form-inline justify-content-end"
        onSubmit={this.searchUser}
      >
        <input
          className="form-control mr-sm-2"
          onChange={e => this.setState({ value: e.target.value })}
          placeholder="Search users"
          type="search"
        />
        <button
          className="btn btn-outline-light my-sm-0 my-2 mx-auto"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}
