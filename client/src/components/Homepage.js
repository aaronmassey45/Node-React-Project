import React, { Component } from 'react';

export default class HomePage extends Component {
  render() {
    return (
      <div className="HomePage container mb-2">
        <h1 className="home-heading">Chowster</h1>
        <div className="card">
          <div className="card-header">Most Recent Posts</div>
        </div>
      </div>
    );
  }
}
