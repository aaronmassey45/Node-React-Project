import React from 'react';
import PropTypes from 'prop-types';

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
            <b>
              {Array.isArray(msg)
                ? msg.map(err => <div key={err}>{err.message}</div>)
                : msg}
            </b>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Alert.propTypes = {
  bg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;
