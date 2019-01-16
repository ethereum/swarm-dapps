import React, { Component } from 'react';
import {
  Form, FormGroup, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import App from './App';

class Starter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      starting: true,
      ws: 'ws://127.0.0.1:8546'
    };
  }

  render() {
    if (this.state.starting) {
      return (
        <Modal isOpen={true} centered>
          <Form className='pt-3'>
            <ModalHeader>WebSocket connection</ModalHeader>
            <ModalBody style={{ wordWrap: 'break-word' }}>
              <FormGroup>
                <Input
                  type='text'
                  id='ws'
                  onChange={(e) => { this.setState({ ws: e.target.value }) }}
                  onKeyPress={(e) => { if (e.key === 'Enter') { this.onRequest(); } }}
                  autoFocus
                  defaultValue={this.state.ws}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={() => {
                this.setState({ starting: false })
              }}>Connect</Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
    }

    return (
      <App ws={this.state.ws} />
    )
  }
}

export default Starter;