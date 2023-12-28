import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import HeroImage2 from "../assets/img/hero2.png";
import HeroImage3 from "../assets/img/hero3.png";

import { useNavigate } from "react-router-dom";

import RunningTextComponent from "../components/RunningTextComponent";
import ComplaintForm from "../components/ComplaintForm";

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6" className="left p-0">
              <h1 className="animate__animated animate__fadeInUp animate__delay-1s">
                Jangan ragu jangan bimbang, masalahmu akan terselesaikan😱😎
              </h1>
              <p className="animate__animated animate__fadeInUp animate__delay-1s">
                Sadam adalah solusi bagi Masyarakat yang ingin melaporkan
                keresahan secara mudah, cepat, dan aman tentunya. Tidak perlu
                datang ke instansi tujuan, cukup dari rumah saja keresahanmu
                bisa tersampaikan.{" "}
              </p>
              <div className="btn-nav d-flex gap-3 animate__animated animate__fadeInUp animate__delay-1s">
                <button
                  type="button"
                  onClick={() => navigate("/complaint")}
                  className="btn report btn-primary rounded-5"
                >
                  Laporin keresahanmu
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/daftar")}
                  className="btn sign btn-outline-primary rounded-5"
                >
                  Daftar
                </button>
              </div>
            </Col>
            <Col lg="6" className="right p-0 pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="hero-img"
                className="hero1 animate__animated animate__fadeInUp"
              />
              <img
                src={HeroImage2}
                alt="hero-img"
                className="hero2 animate__animated animate__fadeIn"
              />
              <img
                src={HeroImage3}
                alt="hero-img"
                className="hero3 animate__animated animate__fadeIn"
              />
            </Col>
          </Row>
        </Container>
      </header>

      <div className="Wording">
        <div className="wording-1 w-100 mb-5">
          <h3 data-aos="fade-up" data-aos-duration="1000">
            Ribet? kata siapa 😡, di Sadam semua kegiatan bisa dilakukan secara
            online kok, engga perlu capek-capek ke kantor instansi lagi👉👈
          </h3>
          <p data-aos="fade-up" data-aos-duration="1000">
            Di Sadam cuma perlu 3 langkah untuk menyelesaikan sebuah masalah.
            Pertama, buat laporan. kedua, tindak lanjut dari instansi terkait.
            ketiga, saling tanggap. Selesai 😁
          </p>
        </div>

        <div className="wording-2 w-100">
          <h3 data-aos="fade-up" data-aos-duration="1000">
            Masih ragu? lebih dari 200.000 masalah sudah terselesaikan dengan
            baik lho. Yuk, sampaikan keresahanmu sekarang.
          </h3>
        </div>
      </div>

      <RunningTextComponent />
      <ComplaintForm />

      <div className="Partner Group">
        <div className="partner">
          <Row lg="8">
            <h4 className="text-center mb-5">Bekerja sama dengan</h4>
          </Row>
          <Row className="mx-5">
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/BNN.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="text-center"
              />
            </Col>
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/Kepolisian.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="d-inline-block"
              />
            </Col>
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/BSSN.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="d-inline-block"
              />
            </Col>
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/KPRI.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="d-inline-block"
              />
            </Col>
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/Ministers.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="d-inline-block"
              />
            </Col>
            <Col className="text-center">
              <img
                src="./src/assets/img/homepage-partner/BIN.png"
                alt="Logo-Sadam-Footer"
                height=""
                className="d-inline-block"
              />
            </Col>
          </Row>
        </div>
      </div>

      <RunningTextComponent />
    </div>
  );
};

export default HomePage;
