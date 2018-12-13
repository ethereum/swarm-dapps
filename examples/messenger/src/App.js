import React, { Component } from 'react';
import { SwarmClient } from '@erebos/swarm-browser';
import {
  Container, Row, Col
} from 'reactstrap';

import Account from './components/Account';
import ContactList from './components/ContactList';
import Chat from './components/Chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      client: {},
      account: {},
      contacts: []
    };

    this.onContactRequest = this.onContactRequest.bind(this);
  }

  async start() {
    const client = new SwarmClient({ ws: 'ws://127.0.0.1:8546' })
    const [publicKey, address] = await Promise.all([
      client.pss.getPublicKey(),
      client.pss.baseAddr(),
    ])
    this.setState({
      client,
      account: {
        publicKey,
        address
      }
    }, () => { console.log(this.state) });
  }

  componentDidMount() {
    this.start();
  }

  onContactRequest(e, value) {
    console.log("s", value)
  }

  render() {
    const { client, account } = this.state;
    const context = { client, account };

    return (
      <Container fluid>
        <header className="App-header p-3">
          Swarm Messenger
        </header>
        <Row>
          <Col sm={4}>
            <Account account={account} />
            <ContactList context={context} onContactRequest={this.onContactRequest} />
          </Col>
          <Col sm={8}>
            <Chat context={context} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
