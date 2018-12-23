import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class ContactRequest extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { value, onAccept, onDecline } = this.props;

    return (
      <div className='text-truncate' onClick={this.toggle}>
        {value}
        <Modal isOpen={this.state.modal} centered>
          <Form className='pt-3'>
            <ModalHeader>Received contact</ModalHeader>
            <ModalBody style={{ wordWrap: 'break-word' }}>
              Do you want to accept request from {value}?
            </ModalBody>
            <ModalFooter>
              <Button color='light' onClick={() => { onDecline(value); this.toggle(); }}>Decline</Button>
              <Button color='primary' onClick={() => { onAccept(value); this.toggle(); }}>Accept</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ContactRequest;