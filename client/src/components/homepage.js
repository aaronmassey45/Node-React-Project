import React, {Component} from 'react';
import axios from 'axios';

export default class HomePage extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    try {
      let res = await axios.get('/posts');
      let posts = res.data.map((post, i) => <li key={i} className="list-group-item">{post.text}</li>);
      this.setState({ posts });
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    return (
      <div className="HomePage">
        <h1>Welcome to Chowster</h1>
        <div className="card">
          <div className="card-header">Most Recent Posts</div>
          <ul className="list-group list-group-flush">
            {this.state.posts}
          </ul>
        </div>
      </div>
    );
  }
}
