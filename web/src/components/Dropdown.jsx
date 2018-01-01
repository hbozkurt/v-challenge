import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ loading, items }) => {
  const renderItem = i => <span className="dropdown-item" key={i.key}>{i.text}</span>;

  return (
    <div className={`dropdown${loading ? ' loading' : ''}`} >
      {loading ?
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
        : items.map(renderItem)
      }
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Dropdown;
