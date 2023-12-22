import React from "react";

const AboutPage = () => {
  return (
    <div className="tentang-kami-page w-100 d-flex flex-column">
      <div className="tentang-kami-header mb-5">
        <h1>Hai👋, masih bingung tentang Sadam. Yuk, baca artikel dibawah ini agar kamu paham tentang Sadam.</h1>
        <p>Sistem Pengaduan Onlie Masyarakat atau biasa dikenal dengan kata “Sadam” adalah sebuah layanan pengaduan keamanan publik berbasis website. Kami melihat banyak masyarakat diluar sana yang sering mengalami kesulitan saat ingin melaporkan keresahannya. Mulai dari jarak, proses yang rumit, dan takut/ kurang nyaman membuat Masyarakat tidak tertarik untuk melaporkan keresahannya. Dengan Sadam semua masalah diatas akan teratasi. Tidak perlu capek-capek datang ke instansi, cukup menggunakan gawai Masyarakat dapat melaporkan keresahannya dimanapun dan kapanpun.</p>
      </div>
      <h3 className="mb-4">Untuk informasi lebih lanjut mengenai Sadam. Yuk kepoin akun medsos Sadam 😊.</h3>
       <div className="medsos">
       <img src="./src/assets/img/medsos/Instagram.png" alt="Instagram-logo"></img>     
       <img src="./src/assets/img/medsos/Telegram.png" alt="Telegram-logo"></img>
        <img src="./src/assets/img/medsos/Facebook.png" alt="Facebook-logo"></img>
        <img src="./src/assets/img/medsos/X.png" alt="X-logo"></img>
      </div>
    </div>
  )
}

export default AboutPage;