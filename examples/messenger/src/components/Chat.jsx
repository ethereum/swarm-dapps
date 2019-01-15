import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Input, Button, InputGroup, InputGroupAddon
} from 'reactstrap';

import PubKey from './PubKey';
import ChatsIcon from './ChatsIcon';

class Chat extends Component {
  static propTypes = {
    data: PropTypes.object,
    onSend: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onChange(e) {
    this.setState({
      msg: e.target.value
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSend();
    }
  }

  onSend() {
    const { data, onSend } = this.props;
    onSend(data.key, this.state.msg);
    this.setState({ msg: '' });
  }

  render() {
    const { data } = this.props;
    if (!data || !data.key) {
      return (
        <div className='d-flex justify-content-center h-100'>
          <ChatsIcon fill='#ccc' style={{ width: 92, height: 'auto' }} />
        </div>
      );
    }

    return (
      <Container fluid className='h-100 d-flex flex-column'>
        <Row className='flex-grow-1'>
          <div className='pt-3'>
            {
              Object.values(data.messages)
                .map((c, i) => {
                  return (
                    <div key={i}>
                      <PubKey publicKey={c.sender} />: {c.text}
                    </div>
                  )
                })
            }
          </div>
        </Row>
        <Row className='flex-shrink-0 pt-3 pb-3'>
          <InputGroup>
            <Input
              value={this.state.msg}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              autoFocus />
            <InputGroupAddon addonType="append">
              <Button
                color="secondary"
                onClick={this.onSend}>Send</Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}

export default Chat;