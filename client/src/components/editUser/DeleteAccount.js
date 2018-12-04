import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import DELETE_USER from '../../mutations/DeleteUser';
import query from '../../queries/CurrentUser';

class DeleteAccount extends Component {
  deleteAccount = async () => {
    try {
      await this.props.mutate({ refetchQueries: [{ query }] });
      localStorage.removeItem('x-auth');
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="modal" id="deleteModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Account</h5>
              <button className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              <p>
                You are about to delete your account. This is permanent, click
                'Delete' if you would like to delete your account.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={this.deleteAccount}
                data-dismiss="modal"
              >
                Delete
              </button>
              <button className="btn btn-secondary" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(graphql(DELETE_USER), withRouter)(DeleteAccount);
