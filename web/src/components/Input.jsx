import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <div className="input">
    <input type="text" {...props} />
    <i className={`fa fa-search${props.disabled ? ' disabled' : ''}`} />
  </div>
);

Input.propTypes = { disabled: PropTypes.bool };
Input.defaultProps = { disabled: false };

export default Input;
