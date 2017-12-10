import React, { Component } from 'react';

class AccountEdit extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  deleteAccount = () => {
    console.log('delete');
  }

  render() {
    return (
      <div className='AccountEdit'>
        <p><i className='fa fa-ban text-danger' aria-hidden='true' onClick={this.deleteAccount}></i> Delete account</p>
      </div>
    );
  }
}
 export default AccountEdit;
