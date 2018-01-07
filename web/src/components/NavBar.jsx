import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ items }) => (
  <nav>
    {items.map(i => <a href={`/${i}`} key={i}>{i}</a>)}
  </nav>
);

NavBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

NavBar.defaultProps = {
  items: [],
};

export default NavBar;
