import React, { Component } from 'react';

import Chowt from './chowt';

export default class FloatingChowt extends Component {
  render() {
    return (
      <div>
        <div className="FloatingChowt">
          <button
            className="btn btn-gray fake-link"
            data-toggle="modal"
            data-target="#chowtModal">
            <i className="fa fa-paper-plane" />
          </button>
        </div>

        <div className="modal fade" id="chowtModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Chowt</h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Chowt />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
