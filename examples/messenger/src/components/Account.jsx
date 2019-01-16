import React, { Component, Fragment } from 'react';

import PubKey from './PubKey';

class Account extends Component {
  render() {
    const { publicKey, overlayAddress } = this.props.account;
    if (!publicKey) {
      return null;
    }

    return (
      <Fragment>
        <div className='pt-3 text-truncate'>
          PublicKey: <PubKey publicKey={publicKey} />
        </div>
        <div className='pt-3 text-truncate'>
          Address: <PubKey publicKey={overlayAddress} />
        </div>
      </Fragment>
    );
  }
}

export default Account;