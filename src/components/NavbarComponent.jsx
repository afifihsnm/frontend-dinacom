import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
        <img
            src="./src/assets/sadam.png"  // Ganti path sesuai dengan lokasi gambar Anda
            alt="Logo_Sadam"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Beranda</Nav.Link>
            <Nav.Link as={Link} to="/about">Tentang</Nav.Link>
            <Nav.Link as={Link} to="/pengaduan">Ajukan Pengaduan</Nav.Link>
          </Nav>
          <div className='navbar-button'>
            <Nav.Link as={Link} to="/link">Link</Nav.Link>
            <Button>Masuk Sekarang</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;