// NavbarComponent.jsx
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  let navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const isLoginPage =
    location.pathname === "/masuk" ||
    location.pathname === "/daftar" ||
    location.pathname === "/lupa-sandi";

  return (
    <Navbar
      expand="lg"
      className={`w-100 ${isLoginPage ? "login-page-navbar" : ""}`}
    >
      <Navbar.Brand as={Link} to="/beranda">
        <img
          src="./src/assets/img/sadamnavbar.png"
          alt="Logo_Sadam"
          height="44"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle
        className={`navbar-toggle position-relative ${expanded ? "active" : ""
          }`}
        onClick={handleToggle}
        aria-controls="basic-navbar-nav"
      >
        <span
          className={`fas ${expanded ? "fa-light fa-arrow-right-long" : "fa-bars"
            }`}
        ></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/beranda" onSelect={() => setExpanded(false)}>
            Beranda
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/tentangkami"
            onSelect={() => setExpanded(false)}
          >
            Tentang Sadam
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/complaint"
            onSelect={() => setExpanded(false)}
          >
            Ajukan Pengaduan
          </Nav.Link>
        </Nav>

        {!isLoginPage && (
          <div className="navbar-sign d-flex">
            <Nav.Link as={Link} to="/masuk" onSelect={() => setExpanded(false)}>
              Masuk
            </Nav.Link>
            <button
              type="button"
              onClick={() => navigate("/daftar")}
              className="btn navbar-btn btn-outline-primary rounded-5"
            >
              Daftar Sekarang
            </button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
