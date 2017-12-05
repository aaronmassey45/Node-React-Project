import React, {Component} from 'react';
import axios from 'axios';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    let url;
    switch (this.props.type) {
      case 'home':
        url = '/posts';
        break;
      default:
        throw new Error('Invalid prop type on PostList component');
        break;
    }

    try {
      let res = await axios.get(url);
      let posts = res.data.map((post, i) => <li key={i} className="list-group-item">{post.text}</li>);
      this.setState({ posts });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.state.posts}
      </ul>
    );
  }
}
