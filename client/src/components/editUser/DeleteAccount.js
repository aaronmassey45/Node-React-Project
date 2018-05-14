import React from 'react';

const DeleteAccount = ({ deleteUser }) => {
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
              onClick={deleteUser}
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
};

export default DeleteAccount;
