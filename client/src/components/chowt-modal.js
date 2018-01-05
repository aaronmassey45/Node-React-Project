import React, { Component } from 'react';

import Chowt from './chowt';
import handleModal from './HOCs/handle-modal';

class FloatingChowt extends Component {
  render() {
    const { hide, show, showModal } = this.props;
    return showModal ? (
      <div>
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Chowt</h5>
                <button className="close" onClick={hide}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Chowt hide={hide} />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show fade" />
      </div>
    ) : (
      <div className="FloatingChowt">
        <button className="btn btn-gray fake-link" onClick={show}>
          <i className="fa fa-paper-plane" />
        </button>
      </div>
    );
  }
}

export default handleModal(FloatingChowt);
