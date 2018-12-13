import React, { Component } from 'react';
import {
  Container, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';

class ContactInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      publicKey: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
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

  render() {
    return (
      <Container fluid>
        <Button color="primary" onClick={this.toggle} block>Invite contact</Button>
        <Modal isOpen={this.state.modal} centered fade>
          <Form className="p-3">
            <ModalHeader>Invite contact</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="contactPublicKey">Contact public key</Label>
                <Input
                  type="text"
                  id="contactPublicKey"
                  placeholder="Public key"
                  onChange={this.onChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="light" onClick={this.toggle}>Cancel</Button>
              <Button color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  this.props.onRequest(e, this.state.publicKey);
                }}>Send Request</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}

export default ContactInvite;