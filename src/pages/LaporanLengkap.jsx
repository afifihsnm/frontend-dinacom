import { useState, useEffect } from "react";
import { Spinner, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import Comment from "../components/Comment";

const LaporanLengkap = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [laporanDetail, setLaporanDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [thanksPopup, setThanksPopup] = useState(false);
  const [responsePopup, setResponsePopup] = useState(false);
  const [reportedPopup, setReportedPopup] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    // Sesuaikan URL API sesuai kebutuhan
    fetch(`https://admin.sadam.bid/api/v1/reports/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
          navigate('/masuk');
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setLaporanDetail(data.data); //
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}/liked`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      // Menampilkan pop-up Butuh Tanggapan Cepat
      setResponsePopup(true);

      // Menutup pop-up Butuh Tanggapan Cepat setelah beberapa detik
      setTimeout(() => {
        setResponsePopup(false);
      }, 3000); // Ubah durasi sesuai kebutuhan
    } catch (error) {
      console.error("Error liking report:", error);
    }
  };

  const handleReport = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}/reporting/report`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(data)
        if (response.status === 403) {
          // Menampilkan pop-up "Anda sudah melaporkan"
          setReportedPopup(true);

          // Menutup pop-up setelah beberapa detik
          setTimeout(() => {
            setReportedPopup(false);
          }, 3000); // Ubah durasi sesuai kebutuhan
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        // Menampilkan pop-up "Terima Kasih"
        setThanksPopup(true);

        // Menutup pop-up "Terima Kasih" setelah beberapa detik
        setTimeout(() => {
          setThanksPopup(false);
        }, 3000); // Ubah durasi sesuai kebutuhan
      }
    } catch (error) {
      console.error("Error reporting report:", error);
    }
  };

  const handleShare = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const reportLink = `https://admin.sadam.bid/laporan/${id}`;

      // Display the link or use it as needed (e.g., show in a modal)
      console.log("Report Link:", reportLink);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching report for sharing:", error);
    }
  };


  return (
    <div className="laporan-lengkap">
      <button
        type="button"
        onClick={() => navigate("/lapor-publik")}
        className="btn lapor-back btn-outline-primary rounded-5 mb-5"
      >
        <i className="bi bi-arrow-left" />
        Kembali
      </button>
      {laporanDetail ? (
        <div className="laporan-detail flex-column">
          <div className="laporan-artikel d-flex w-100">
            {laporanDetail.user && laporanDetail.user.avatar ? (
              <img
                src={laporanDetail.user.avatar.replace(
                  "https://admin.sadam.bid/",
                  ""
                )}
                alt={`avatar ${laporanDetail.id}`}
                className="avatar"
              />
            ) : (
              <div className="avatar-anonim"></div>
            )}
            <div className="laporan-content">
              <div className="laporan-head d-flex mb-2">
                <div className="badge d-flex gap-2 p-0 mb-3 align-items-center">
                  {laporanDetail.user && laporanDetail.user.username && (
                    <h3>{laporanDetail.user.username}</h3>
                  )}
                  {!laporanDetail.user && (
                    <span className="anonim-username">Anonim</span>
                  )}
                  <p>{laporanDetail.publishedAt}</p>
                  {laporanDetail.status === 0 && (
                    <label className="badge-status1 d-flex">
                      Belum ditangani
                    </label>
                  )}
                  {laporanDetail.status === 1 && (
                    <label className="badge-status2 d-flex">
                      Sedang Ditangani
                    </label>
                  )}
                  {laporanDetail.status === 2 && (
                    <label className="badge-status3 d-flex">Selesai</label>
                  )}
                  {laporanDetail.status === 3 && (
                    <label className="badge-status4 d-flex">Ditolak</label>
                  )}

                  {laporanDetail.visibility === 1 && (
                    <label className="badge-post1 d-flex">
                      Terbuka untuk publik
                    </label>
                  )}
                  {laporanDetail.visibility === 0 && (
                    <label className="badge-post2 d-flex">Rahasia</label>
                  )}
                </div>
              </div>

              <div className="laporan-body gap-2 d-flex flex-column">
                <h4 className="laporan-title">{laporanDetail.title}</h4>
                <p className="laporan-desc">{laporanDetail.content}</p>
                <p className="laporan-desc">Lampiran:</p>
                {laporanDetail.image && laporanDetail.image.length > 0 && (
                  <img src={laporanDetail.image[0].path} alt="Laporan" />
                )}
                <div className="laporan-comment d-flex">
                  <p> Komentar ({laporanDetail.totalComment}) </p>
                  <span className="black-dot">•</span>
                  <p>
                    {" "}
                    Butuh tanggapan cepat ({
                      laporanDetail.totalNeedResponse
                    }){" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="laporan-tanggapan">
            <div className="respons d-flex mt-4 align-items-center gap-3">
              <Button className="btn-respons" variant="outline-primary" onClick={handleLike}>
                Butuh tanggapan cepat
              </Button>
              <Button className="btn-respons" variant="outline-primary" onClick={handleReport}>
                Laporakan laporan ini
              </Button>
              <Button className="btn-respons" variant="outline-primary" onClick={handleShare}>
                Bagikan
              </Button>
            </div>
            {/* Pop-up Terima Kasih */}
            {thanksPopup && (
              <div className="popup">
                <p>Terima Kasih. Kami akan segera menindak lanjuti laporan ini.</p>
              </div>
            )}
            {/* Pop-up "Anda sudah melaporkan" */}
            {reportedPopup && (
              <div className="popup">
                <p>Anda sudah melaporkan laporan ini.</p>
              </div>
            )}
            {/* Pop-up Butuh Tanggapan Cepat */}
            {responsePopup && (
              <div className="popup">
                <p>Anda telah membutuhkan tanggapan cepat.</p>
              </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header>
                <Modal.Title>Bagikan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Tautan Laporan</p>
                <input type="text" value={`https://admin.sadam.bid/laporan/${id}`} readOnly />
              </Modal.Body>
            </Modal>

          </div>
          <Comment id={id} />
        </div>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </div>
  );
};

export default LaporanLengkap;
