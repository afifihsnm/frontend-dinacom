import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar expand="lg" className="navbar w-100" style={{ backgroundColor: '#ECF5FF' }}>
      <Navbar.Brand as={Link} to="/">
        <img
          src="./src/assets/sadam.png"
          alt="Logo_Sadam"
          height="44"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle
        className={`navbar-toggle position-relative ${expanded ? 'active' : ''}`}
        onClick={handleToggle}
        aria-controls="basic-navbar-nav"
      >
        <span className={`fas ${expanded ? 'fa-light fa-arrow-right-long' : 'fa-bars'}`}></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
            Beranda
          </Nav.Link>
          <Nav.Link as={Link} to="/tentang" onClick={() => setExpanded(false)}>
            Tentang Sadam
          </Nav.Link>
          <Nav.Link as={Link} to="/pengaduan" onClick={() => setExpanded(false)}>
            Ajukan Pengaduan
          </Nav.Link>
        </Nav>
        <div className='navbar-sign d-flex'>
          <Nav.Link as={Link} to="/signup" onClick={() => setExpanded(false)}>
            Masuk
          </Nav.Link>
          <button type="button" className="btn navbar-btn btn-outline-primary rounded-5" onClick={() => setExpanded(false)}>
            Daftar Sekarang
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
