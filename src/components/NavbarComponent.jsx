import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
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
    <Navbar.Toggle className='navbar-toggle position-relative' aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto">
        <Nav.Link as={Link} to="/">Beranda</Nav.Link>
        <Nav.Link as={Link} to="/tentang">Tentang Sadam</Nav.Link>
        <Nav.Link as={Link} to="/pengaduan">Ajukan Pengaduan</Nav.Link>
      </Nav>
      <div className='navbar-sign d-flex gap-3'>
        <Nav.Link as={Link} to="/link">Masuk</Nav.Link>
        <button type="button" className="btn navbar-btn btn-outline-primary rounded-5">Daftar Sekarang</button>
      </div>
    </Navbar.Collapse>
  </Navbar>  
  );
};

export default NavbarComponent;