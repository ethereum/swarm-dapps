import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onStartChat: PropTypes.func.isRequired
  };

  render() {
    const { list, onStartChat } = this.props;
    return (
      <div className='pt-3'>
        <h5>Chats</h5>
        {
          list.map((c, i) =>
            <div key={i} className='text-truncate' onClick={() => { onStartChat(c); }}>
              {c.key}
            </div>)
        }
      </div>
    );
  }
}

export default ChatList;