import React from 'react';
import PropTypes from 'prop-types';

export default function ChatsIcon({ active, fill, style }) {
    const color = active ? '#F9A026' : fill;
    return (
        <svg viewBox='0 0 489.6 489.6' style={style}>
            <g>
                <path fill={color} d='M394.8,261.5V81.7c0-24.9-20.3-45.2-45.2-45.2H45.2C20.3,36.5,0,56.8,0,81.7v179.8c0,24.9,20.3,45.2,45.2,45.2h12.9v54.2
                    c0,10,8.1,18.1,18.2,18.1l0,0c5.2,0,10.2-2.3,13.7-6.3l57.1-66.1h202.6C374.5,306.7,394.8,286.4,394.8,261.5z M141.4,282.2
                    c-3.6,0-6.9,1.5-9.3,4.2l-49.6,57.3v-49.3c0-6.8-5.5-12.3-12.3-12.3h-25c-11.4,0-20.7-9.3-20.7-20.7V81.7
                    c0-11.4,9.3-20.7,20.7-20.7h304.4c11.4,0,20.7,9.3,20.7,20.7v179.8c0,11.4-9.3,20.7-20.7,20.7L141.4,282.2L141.4,282.2z'/>
                <path fill={color} d='M399.7,446.8c3.5,4.1,8.5,6.3,13.6,6.3c2.1,0,4.3-0.4,6.4-1.2c7.2-2.7,11.8-9.3,11.8-17v-54.2h12.9
                    c24.9,0,45.2-20.3,45.2-45.2V155.7c0-24.9-20.3-45.2-45.2-45.2c-6.8,0-12.3,5.5-12.3,12.2c0,6.8,5.5,12.3,12.3,12.3
                    c11.4,0,20.7,9.3,20.7,20.7v179.8c0,11.4-9.3,20.7-20.7,20.7h-25.1c-6.8,0-12.3,5.5-12.3,12.3v49.3l-49.6-57.3
                    c-2.3-2.7-5.7-4.2-9.3-4.2h-184c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h178.4L399.7,446.8z'/>
                <circle fill={color} cx='197.4' cy='175.9' r='14.6'/>
                <circle fill={color} cx='246.3' cy='175.9' r='14.6'/>
                <circle fill={color} cx='148.5' cy='175.9' r='14.6'/>
            </g>
        </svg>
    );
}

ChatsIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  style: PropTypes.object,
  fill: PropTypes.string,
};

ChatsIcon.defaultProps = {
  active: false,
  style: { width: 42, height: 'auto' },
  fill: '#282c34'
};