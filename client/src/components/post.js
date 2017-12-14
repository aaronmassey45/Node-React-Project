import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modifyPost } from '../store/actions/postActions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false
    };
  }

  likePost = async () => {
    try {
      await this.props.actions.modifyPost(this.props.id, 'PATCH');
      this.setState({ liked: true });
    } catch (err) {
      alert('Couldn\'t like post');
      console.log(err);
    }
  }

  deletePost = async () => {
    try {
      await this.props.actions.modifyPost(this.props.id, 'DELETE');
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    let heart = !this.state.liked ? '-o' : ' text-danger';
    const { post, username, showDelete } = this.props;
    return (
      <div className="Post">
        <div className="row">
          <div className="col-3 my-auto">
            <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="" className="rounded float-left img-fluid"/>
          </div>
          <div className="col-8 my-auto">
            <div className="text-left row">
              <span className="col-10">
                <Link to={`/users/account/${username}`}>
                  @{username}
                </Link>
              </span>
              {
                showDelete ?
                  <span className="col-2 text-right">
                    <i className="fa fa-trash fake-link" onClick={this.deletePost}></i>
                  </span> :
                  ''
              }
            </div>
            <div className="row text-left">
              <div className="col-12 mt-1" dangerouslySetInnerHTML={{ __html: post.text}} />
              <div className='col-12 mt-1'>
                <i className={`fa fa-heart${heart} fa-sm fake-link`} onClick={this.likePost}></i>
                <span className="text-gray ml-2">{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({modifyPost}, dispatch)
});

export default connect(null, mapDispatchToProps)(Post);
