import React, { Component } from 'react';
import axios from 'axios';

export default class FloatingChowt extends Component {
  state = { chowt: '' }

  handleChange = e => {
    this.setState({ chowt: e.target.value });
  }

  submitChowt = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('x-auth');
      const headers = { 'x-auth': token };
      await axios.post('/chowt', { text: this.state.chowt }, { headers });
      this.setState({ chowt: '' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <div>
        <div className="FloatingChowt">
          <button className="btn btn-gray fake-link" data-toggle="modal" data-target="#chowtModal">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>

        <div className="modal fade" id='chowtModal' tabIndex='-1' role='dialog'>
          <div className="modal-dialog" role='document'>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Chowt</h5>
                <button className="close" data-dismiss='modal' aria-label='Close'>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.submitChowt}>
                  <div className="input-group">
                    <input
                      className='form-control'
                      onChange={this.handleChange}
                      placeholder='Chowt it out!'
                      required
                      type="text"
                      value={this.state.chowt}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type='submit'>
                        <i className="fa fa-paper-plane"></i> Send
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
