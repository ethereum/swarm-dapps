import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, FormGroup, Label, Input, Alert
} from 'reactstrap';

class ContactInvite extends Component {
  static propTypes = {
    onRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      publicKey: '',
      error: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onRequest = this.onRequest.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({
      publicKey: e.target.value
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onRequest();
    }
  }

  async onRequest() {
    try {
      await this.props.onRequest(this.state.publicKey);
    } catch (error) {
      if (error) {
        this.setState({ error: error.message });
        return;
      }
    }
    this.toggle();
  }

  render() {
    return (
      <Fragment>
        <Button color='primary' onClick={this.toggle} size='sm' className='float-right'>+ Invite contact</Button>
        <Modal isOpen={this.state.modal} centered>
          <ModalHeader>Invite contact</ModalHeader>
          <ModalBody>
            {this.state.error ? <Alert color='danger'>{this.state.error}</Alert> : null}
            <FormGroup>
              <Label for='contactPublicKey'>Contact public key</Label>
              <Input
                type='text'
                id='contactPublicKey'
                placeholder='Public key'
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                autoFocus
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='light' onClick={this.toggle}>Cancel</Button>
            <Button type='button' color='primary' onClick={this.onRequest}>Send Request</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ContactInvite;