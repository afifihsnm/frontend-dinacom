import { Container, Row, Col } from "react-bootstrap";
import HeroImage from '../assets/img/hero.png';
import HeroImage2 from '../assets/img/hero2.png';
import HeroImage3 from '../assets/img/hero3.png';


const HomePage = () => {
  return (
    <div className="homepage">
    <header className="w-100 d-flex">
      <Container>
        <Row className="header-box d-flex align-items-center">
          <Col lg="6" className="left p-0">
            <h1>Jangan ragu jangan bimbang, masalahmu akan terselesaikan😱😎</h1>
            <p>Sadam adalah solusi bagi Masyarakat yang ingin melaporkan keresahan secara mudah, cepat, dan aman tentunya. Tidak perlu datang ke instansi tujuan, cukup dari rumah saja keresahanmu bisa tersampaikan. </p>
            <div className="d-flex gap-3">
            <button type="button" className="btn report btn-primary rounded-5">
            Laporin keresahanmu
          </button>
            <button type="button" className="btn sign btn-outline-primary rounded-5">
            Daftar
           </button>
           </div>
          </Col>
          <Col lg="6" className="right p-0 pt-lg-0 pt-5">
          <img src={HeroImage} alt="hero-img" className="hero1"/>
          <img src={HeroImage2} alt="hero-img" className="hero2" />
          <img src={HeroImage3} alt="hero-img" className="hero3" />
          </Col>
        </Row>
      </Container>
    </header>

    <div className="wording-1 w-100 mb-5">
      <h1>Ribet? kata siapa 😡, di Sadam semua kegiatan bisa dilakukan secara online kok, engga perlu capek-capek ke kantor instansi lagi👉👈</h1>
      <p>Di Sadam cuma perlu 3 langkah untuk menyelesaikan sebuah masalah. Pertama, buat laporan. kedua, tindak lanjut dari instansi terkait. ketiga, saling tanggap. Selesai 😁</p>
    </div>

    <div className="wording-2 w-100">
      <h1>Masih ragu? lebih dari 200.000 masalah sudah terselesaikan dengan baik lho. Yuk, sampaikan keresahanmu sekarang.</h1>
    </div>

    <div className="marquee-container" style={{ backgroundColor: '#0E206A' }}>
      <div className="marquee-text">
      <p>
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span>
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot">•</span> 
      Sistem Pengaduan Online Masyarakat <span className="bold-dot"></span>
    </p>
      </div>
   </div>

    <div className=""></div>
    <div className=""></div>
    <div className=""></div>
    </div>
  );
};

export default HomePage;