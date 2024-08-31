/* import React from 'react';
import './styles.css';
const Footer = () => (
  <footer className="footer bg-white text-dark py-3 mt-auto ">
    <div className="container" style={{color: 'black', }}>

      <span className="text-dark "><h5>Developed by Casper FFG. Check out the code on <a  href="https://github.com/abhinavjain1110/WebTracker" target="_blank" rel="noopener noreferrer" className="text-dark" style={{fontWeight: 'bold'}}>GitHub</a>.</h5></span>
    </div>
  </footer>
);

export default Footer; */
import React from 'react';
import './styles.css';

const Footer = () => (
  <div>
    <hr className="footer-divider" />
    <footer className="footer bg-white text-dark py-1 mt-auto">
      <div className="container" style={{ color: 'black' }}>
        <span className="text-dark">
          <h5>
            Developed by Casper FFG. Check out the code on{' '}
            <a
              href="https://github.com/abhinavjain1110/WebTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
              style={{ fontWeight: 'bold' }}
            >
              GitHub
            </a>
            .
          </h5>
        </span>
      </div>
    </footer>
  </div>
);

export default Footer;
