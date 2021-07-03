import React from 'react';
import '../../styles/Navbar.scss';

function Navbar() {
  return (
    <div id="navbar">
      <div className="container">
        <div className="nav-inner">
          <a href="/" id="nav-logo">AirConf</a>
          <div id="menu">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="https://github.com/FaizBShah" target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li className="menu-item">
                <a href="https://www.linkedin.com/in/faiz-shah-0b5955189/" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li className="menu-item">
                <a href="https://twitter.com/Random_CSE_guy" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="menu-item">
                <a href="mailto:faizbshah2001@gmail.com" target="_blank" rel="noreferrer">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;