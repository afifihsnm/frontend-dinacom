import { useState } from "react";
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="sidebar" responsive="lg">
      <span className="icon-bars" onClick={handleShow}><i class="fas fa-bars"></i></span>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header className="mb-3">
          <span className="icon-bars" onClick={handleClose}><i class="fa-solid fa-arrow-left-long"></i></span>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <h5>Layanan</h5>
          <Link to="/dashboard"><span className="icon"><i class="bi bi-house-fill" style={{ fontSize: '1.5rem' }}></i></span>Dashboard</Link>
          <Link to="/dashboard"><span className="icon"><i class="bi bi-file-earmark-plus" style={{ fontSize: '1.5rem' }}></i></span>Laporin</Link>
          <Link to="/dashboard"><span className="icon"><i class="bi bi-file-earmark-text" style={{ fontSize: '1.5rem' }}></i></span>Laporin Publik</Link>
          <Link to="/dashboard"><span className="icon"><i class="bi bi-chat-square-text" style={{ fontSize: '1.5rem' }}></i></span>Pesan</Link>

          <h5>Dukungan</h5>
          <Link to="/"><span className="icon"><i class="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i></span>Akun</Link>
          <Link to="/"><span className="icon"><i class="bi bi-door-open" style={{ fontSize: '1.5rem' }}></i></span>Logout</Link>        </Offcanvas.Body>
      </Offcanvas>

      <img
        src="./src/assets/img/sadamnavbar.png"
        alt="Logo_Sadam"
        className="d-inline-block align-top"
      />

      <h5>Layanan</h5>
      <Link to="/dashboard"><span className="icon"><i class="bi bi-house-fill" style={{ fontSize: '1.5rem' }}></i></span>Dashboard</Link>
      <Link to="/dashboard"><span className="icon"><i class="bi bi-file-earmark-plus" style={{ fontSize: '1.5rem' }}></i></span>Laporin</Link>
      <Link to="/dashboard"><span className="icon"><i class="bi bi-file-earmark-text" style={{ fontSize: '1.5rem' }}></i></span>Laporin Publik</Link>
      <Link to="/dashboard"><span className="icon"><i class="bi bi-chat-square-text" style={{ fontSize: '1.5rem' }}></i></span>Pesan</Link>

      <h5>Dukungan</h5>
      <Link to="/"><span className="icon"><i class="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i></span>Akun</Link>
      <Link to="/"><span className="icon"><i class="bi bi-door-open" style={{ fontSize: '1.5rem' }}></i></span>Logout</Link>
    </div>
  );
}

export default Sidebar;
