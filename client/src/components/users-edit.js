import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteUser } from '../store/actions/userActions';

class AccountEdit extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false
    };
  }

  deleteAccount = async () => {
    try {
      await this.props.actions.deleteUser();
      this.setState({ redirect: true })
    } catch (err) {
      alert('Couldn\'t delete account');
      console.log(err);
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />;

    return (
      <div className='AccountEdit'>
        <button className='btn btn-danger text-white' data-toggle='modal' data-target='#deleteModal'>
          <i className='fa fa-ban' aria-hidden='true'></i> Delete account
        </button>

        <div className='modal' id='deleteModal' tabIndex='-1' role='dialog'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Delete Account</h5>
                <button className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body text-left'>
                <p>
                  You are about to delete your account. This is permanent, click 'delete' if you would like to delete your account.
                </p>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-danger' onClick={this.deleteAccount} data-dismiss='modal'>Delete</button>
                <button className='btn btn-secondary' data-dismiss='modal'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({deleteUser}, dispatch)
});

export default connect(null, mapDispatchToProps)(AccountEdit);
