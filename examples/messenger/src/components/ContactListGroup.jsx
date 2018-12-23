import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ContactListGroup extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    list: PropTypes.array,
    title: PropTypes.string,
  };

  render() {
    const { list, title, renderItem } = this.props;
    if (!list || !list.length) {
      return null;
    }

    const items = list.map((c, i) => { return renderItem(c, i); });
    return (
      <Fragment>
        <h6>{title}</h6>
        {items}
      </Fragment>
    );
  }
}

ContactListGroup.defaultProps = {
  renderItem: (c, i) => <div key={i} className='text-truncate'>{c.key}</div>
};

export default ContactListGroup;