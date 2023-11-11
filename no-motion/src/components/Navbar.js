import React from "react";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <a href="#hero" className="hero-brand">
        mg
      </a>
      <nav className="flex">
        <ul className="flex flex-col">
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Work</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
      <a>in</a>
    </div>
  );
};

export default Navbar;
