//Import Image
import logoInstagram from "../assets/img/medsos/Instagram.png";
import logoTelegram from "../assets/img/medsos/Telegram.png";
import logoFacebook from "../assets/img/medsos/facebook.png";
import logoX from "../assets/img/medsos/X.png";

const AboutPage = () => {
  return (
    <div className="tentang-kami-page w-100 d-flex flex-column">
      <div className="tentang-kami">
        <div className="tentang-kami-header mb-5 overflow-hidden">
          <h1 className="animate__animated animate__fadeInUp">
            Hai👋, masih bingung tentang Sadam. Yuk, baca artikel dibawah ini
            agar kamu paham tentang Sadam.
          </h1>
          <p className="animate__animated animate__fadeInUp animate__delay-1s">
            Sistem Pengaduan Online Masyarakat atau biasa dikenal dengan kata
            “Sadam” adalah sebuah layanan pengaduan keamanan publik berbasis
            website. Kami melihat banyak masyarakat diluar sana yang sering
            mengalami kesulitan saat ingin melaporkan keresahannya. Mulai dari
            jarak, proses yang rumit, dan takut/ kurang nyaman membuat
            Masyarakat tidak tertarik untuk melaporkan keresahannya. Dengan
            Sadam semua masalah diatas akan teratasi. Tidak perlu capek-capek
            datang ke instansi, cukup menggunakan gawai Masyarakat dapat
            melaporkan keresahannya dimanapun dan kapanpun.
          </p>
        </div>
        <h3 className="mb-4" data-aos="fade-up" data-aos-duration="800">
          Untuk informasi lebih lanjut mengenai Sadam. Yuk kepoin akun medsos
          Sadam 😊.
        </h3>
        <div className="medsos">
          <img
            data-aos="fade-up" data-aos-duration="400"
            src={logoInstagram}
            alt="Instagram-logo"
          ></img>
          <img
            data-aos="fade-up" data-aos-duration="600"
            src={logoTelegram}
            alt="Telegram-logo"
          ></img>
          <img
            data-aos="fade-up" data-aos-duration="800"
            src={logoFacebook}
            alt="Facebook-logo"
          ></img>
          <img 
            data-aos="fade-up" data-aos-duration="1000"
            src={logoX}
            alt="X-logo">
            </img>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
