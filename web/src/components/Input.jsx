import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <div className={`input${(props.disabled ? ' disabled' : '')}`}>
    <input type="text" {...props} />
    <i className="icon icon-search" />
  </div>
);

Input.propTypes = { disabled: PropTypes.bool };
Input.defaultProps = { disabled: false };

export default Input;
