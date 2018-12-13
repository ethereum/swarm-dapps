import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Account extends Component {
  render() {
    return (
      <Container fluid className="p-3 text-truncate">
        {this.props.account.publicKey}
      </Container>
    );
  }
}

export default Account;