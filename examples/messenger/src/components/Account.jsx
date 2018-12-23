import React, { Component } from 'react';

class Account extends Component {
  render() {
    return (
      <div className='pt-3 text-truncate'>
        {this.props.account.publicKey}
      </div>
    );
  }
}

export default Account;