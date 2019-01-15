import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class PubKey extends Component {
  static propTypes = {
    publicKey: PropTypes.string.isRequired
  };

  render() {
    const { publicKey } = this.props;
    if (!publicKey) {
      return null;
    }

    return (
      <Fragment>
        <CopyToClipboard text={publicKey} style={{ cursor: 'pointer' }}>
          <span>{publicKey.substr(0, 6) + '...' + publicKey.substr(publicKey.length - 4)}</span>
        </CopyToClipboard>
      </Fragment>
    );
  }
}