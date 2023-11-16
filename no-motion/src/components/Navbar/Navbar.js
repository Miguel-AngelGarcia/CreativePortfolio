import React from "react";
import { Hamburger } from "./Hamburger";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-cont">
        <a href="#hero" className="navbar-brand">
          mg
        </a>
        <nav className="nav-menu-wrapper w-nav-menu">
          <ul className="nav-menu">
            <li className="nav-link-wrapper">
              <a className="sideways">About</a>
            </li>
            <li className="nav-link-wrapper">
              <a>Work</a>
            </li>
            <li className="nav-link-wrapper">
              <a>Contact</a>
            </li>
          </ul>
        </nav>
        <div className="nav-in">
          <a>in</a>
        </div>
      </div>
      <Hamburger />
    </div>
  );
};

export default Navbar;
