import React, { Component } from 'react';

import Chowt from './Chowt';
import handleModal from './HOCs/handle-modal';

class FloatingChowt extends Component {
  render() {
    const { hide, show, showModal } = this.props;
    return (
      <div>
        <div className="FloatingChowt">
          <button className="btn btn-gray fake-link" onClick={show}>
            <i className="fa fa-paper-plane" />
          </button>
        </div>
        <div>
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal ? 'block' : 'none' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Send Chowt</h5>
                  <button className="close" onClick={hide}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Chowt hideAfterSubmit={hide} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop show fade"
            style={{ display: showModal ? 'block' : 'none' }}
          />
        </div>
      </div>
    );
  }
}

export default handleModal(FloatingChowt);
