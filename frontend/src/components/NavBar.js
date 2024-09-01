import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><h4>Casper FFG</h4></Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/watchlist">Watchlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/qr-scanner">QR Code Scanner</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
