import React from 'react';

const Alert = props => (
  <div
    className="modal"
    tabIndex="-1"
    role="dialog"
    style={{ display: 'block' }}
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className={`modal-content bg-${props.bg ? props.bg : 'light'}`}>
        <div className="modal-header">
          <button
            type="button"
            onClick={props.closeModal}
            className={`close p-3 btn btn-${props.bg ? props.bg : 'light'}`}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <b>{props.msg}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Alert;
