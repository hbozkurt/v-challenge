import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Menu from './Menu';

const navItems = ['clothing', 'travel', 'nursery furniture', 'nursery interiors', 'playtime', 'bathtime', 'feeding', 'gifts'];

const Header = ({ isMobile }) => (
  <div className="header" >
    <div className={`menu${(isMobile ? ' mobile' : '')}`}>
      { isMobile && <Menu /> }
    </div>
    <div className="logo">
      <a className="icon icon-logo" href="/" ><span /></a>
    </div>
    <div className={`sign-in${(isMobile ? ' mobile' : '')}`}>
      { isMobile ?
        <span className="icon icon-bag" />
        : <span>Sing In/Register | Stores/Stockists | Your Bag</span>
      }
    </div>
    <div className={`navbar${(isMobile ? ' mobile' : '')}`}>
      { isMobile ?
        <span>Sing In/Register | Stores</span>
        : <NavBar items={navItems} />
      }
    </div>
  </div>
);

Header.propTypes = {
  isMobile: PropTypes.bool,
};

Header.defaultProps = {
  isMobile: false,
};

export default Header;
