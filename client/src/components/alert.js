import React from 'react';

const Alert = ({ bg, closeModal, msg }) => (
  <div
    className="modal"
    tabIndex="-1"
    role="dialog"
    style={{ display: 'block' }}
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className={`modal-content bg-${bg ? bg : 'light'}`}>
        <div className="modal-header">
          <button
            type="button"
            onClick={closeModal}
            className={`close p-3 btn btn-${bg ? bg : 'light'}`}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <b>{msg}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Alert;
