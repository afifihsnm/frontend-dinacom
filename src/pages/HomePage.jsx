import { Container, Row, Col } from "react-bootstrap";
import HeroImage from '../assets/img/hero.png';

const HomePage = () => {
  return (
    <div className="homepage">
    <header className="w-100 min-vh-100 d-flex">
      <Container>
        <Row className="header-box d-flex align-items-center">
          <Col>
            <h1>Jangan ragu jangan bimbang, masalahmu akan terselesaikan😱😎</h1>
            <p>Sadam adalah solusi bagi Masyarakat yang ingin melaporkan keresahan secara mudah, cepat, dan aman tentunya. Tidak perlu datang ke instansi tujuan, cukup dari rumah saja keresahanmu bisa tersampaikan. </p>
            <button className="btn">Laporin Keresahanmu</button>
            <button>Daftar</button>
          </Col>
          <Col>
          <img src={HeroImage} height='' alt="hero-img" />
          </Col>
        </Row>
      </Container>
    </header>












    <div className="w-100 min-vh-100"></div>
    <div className=""></div>
    <div className=""></div>
    <div className=""></div>
    <div className=""></div>
    <div className=""></div>
    </div>
  );
};

export default HomePage;