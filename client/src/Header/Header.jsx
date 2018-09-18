import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header">
    <div className="header__title">My Reads</div>
    {window.location.pathname === "/search" ? (
      <Link to="/" className="header__home-button" />
    ) : (
      <Link to="/search" className="header__search-button" />
    )}
  </div>
);

export default Header;
