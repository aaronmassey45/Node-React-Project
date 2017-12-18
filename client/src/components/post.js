import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modifyPost, fetchPosts } from '../store/actions/postActions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false
    };
  }

  likePost = async () => {
    if (this.props.loggedIn) {
      try {
        await this.props.modifyPost(this.props.id, 'PATCH');
        await this.props.fetchPosts();
        this.setState({ liked: true });
      } catch (err) {
        alert('Couldn\'t like post');
        console.log(err);
      }
    }
  }

  deletePost = async () => {
    try {
      await this.props.modifyPost(this.props.id, 'DELETE');
      this.props.fetchPosts();
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    let heart = !this.state.liked ? '-o' : ' text-danger';
    const { post, profile, showDelete } = this.props;
    return (
      <div className="Post">
        <div className="row">
          <div className="col-3 my-auto">
            <img src={profile.profileImg} alt="" className="rounded float-left img-fluid"/>
          </div>
          <div className="col-8 my-auto itim-font">
            <div className="text-left row">
              <span className="col-10">
                <Link to={`/users/account/${profile.username}`}>
                  @{profile.username}
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

const mapStateToProps = state => ({
  loggedIn: state.appState.loggedIn
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({modifyPost, fetchPosts}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
