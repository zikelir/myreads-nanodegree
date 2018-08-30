import React from 'react';
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header__title">My Reads</div>
        <div className="header__search-button" />
      </div>
    );
  }
}

export default Header;