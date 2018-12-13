import React, { Component } from 'react';
import { Container } from 'reactstrap';

import ContactInvite from './ContactInvite';

class ContactList extends Component {
  render() {
    return (
      <Container fluid className="p-3">
        <h5>Contacts</h5>
        <ContactInvite onRequest={this.props.onContactRequest}/>
      </Container>
    );
  }
}

export default ContactList;