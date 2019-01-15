import React, { Component } from 'react';

import PubKey from './PubKey';

class Account extends Component {
  render() {
    const { publicKey } = this.props.account;
    if (!publicKey) {
      return null;
    }

    return (
      <div className='pt-3 text-truncate'>
        <PubKey publicKey={publicKey} />
      </div>
    );
  }
}

export default Account;