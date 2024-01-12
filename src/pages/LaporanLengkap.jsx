import { useState, useEffect } from "react";
import { Spinner, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const LaporanLengkap = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [laporanDetail, setLaporanDetail] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tanggapan laporan dikirim:", e.target.contentReport.value);
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
          <div className="respons">
            <ButtonToolbar aria-label="Button Respons">
              <ButtonGroup className="me-2" aria-label="Button liked">
                <Button className="btn-respons">1</Button>
              </ButtonGroup>
              <ButtonGroup className="me-2" aria-label="Button Report">
                <Button className="btn-respons">5</Button>
              </ButtonGroup>
              <ButtonGroup aria-label="Button Share">
                <Button className="btn-respons">8</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </div>
  );
};

export default LaporanLengkap;
