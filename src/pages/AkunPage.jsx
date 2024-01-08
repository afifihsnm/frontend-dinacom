import { Form } from "react-bootstrap";

function AkunPage() {
  return (
    <div className="akun">
      <div className="akun-content">
        <h1>Akun</h1>
        <div className="akun-category">
          <div className="akun-category-publik">
            <h2 className="mb-1">Publik</h2>
            <p className="mb-2">Data yang dapat dilihat oleh publik.</p>
            <hr className="mt-0 mb-4" />
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
          </div>
          <div className="akun-category-pribadi">
            <h2>Pribadi</h2>
            <p>Informasi pribadi</p>
            <hr className="mt-0 mb-4" />
            <Form.Group className="mb-3">
              <Form.Label>Tanggal lahir</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tempat tinggal</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control placeholder="Disabled input" disabled />
            </Form.Group>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AkunPage;