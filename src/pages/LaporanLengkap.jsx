import { useState, useEffect } from "react";
import { Spinner, Button, Modal, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import Comment from "../components/Comment";

const LaporanLengkap = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [laporanDetail, setLaporanDetail] = useState(null);
  const [showQuickResponseModal, setShowQuickResponseModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [responseGiven, setResponseGiven] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [comments, setComments] = useState([]);

  const [replyContent, setReplyContent] = useState("");
  const [isAnonymousReply, setIsAnonymousReply] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [replySubmitted, setReplySubmitted] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetch(`https://admin.sadam.bid/api/v1/reports/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/masuk");
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setLaporanDetail(data.data);

        // Set komentar
        setComments(data.data.comment);
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

      // Menampilkan modal untuk tanggapan cepat
      setShowQuickResponseModal(true);
      setResponseGiven(true); // Set status tanggapan cepat


      setTimeout(() => {
        setShowQuickResponseModal(false);
        setResponseGiven(false); // Reset status tanggapan cepat
      }, 3000);
    } catch (error) {
      console.error("Error liking report:", error);

      // Menampilkan modal untuk pesan kesalahan 
      if (error.message.includes("Status: 400")) {
        setShowQuickResponseModal(true);
        setResponseGiven(false); // Set status tanggapan cepat

        setTimeout(() => {
          setShowQuickResponseModal(false);
          setResponseGiven(false); // Reset status tanggapan cepat
        }, 3000);
      }
    }
  };

  const handleReport = async () => {
    const token = localStorage.getItem("token");
    console.log("Handle Report called");

    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}/reporting/report`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 422) {
          setShowReportModal(true);

          setTimeout(() => {
            setShowReportModal(false);
          }, 3000);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        setReportSuccess(true);

        setTimeout(() => {
          setReportSuccess(false);
        }, 5000);
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

      // Menampilkan modal untuk share
      setShowShareModal(true);
    } catch (error) {
      console.error("Error fetching report for sharing:", error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingCommentId(commentId);
  };

  const fetchComments = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}/comments`, {
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
      return data.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const handleReplySubmit = async (parentCommentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://admin.sadam.bid/api/v1/reports/${id}/comments/${parentCommentId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyContent,
          name_visibility: isAnonymousReply ? 0 : 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedComments = await fetchComments();
      setComments(updatedComments);

      setVisibleReplies((prevVisibleReplies) => [
        ...prevVisibleReplies,
        parentCommentId,
      ]);

      setReplyContent("");
      setIsAnonymousReply(false);
      setReplyingCommentId(null);

      console.log("Reply submitted successfully");

      window.location.reload();
      // Setelah berhasil mengirim balasan
      setReplySubmitted(true);

      setTimeout(() => {
        setReplySubmitted(false); // Reset status submit setelah beberapa detik
      }, 3000);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleToggleReplies = (commentId) => {
    const updatedVisibleReplies = [...visibleReplies];

    if (updatedVisibleReplies.includes(commentId)) {
      // If the comment is already visible, remove it from the list
      updatedVisibleReplies.splice(updatedVisibleReplies.indexOf(commentId), 1);
    } else {
      updatedVisibleReplies.push(commentId);
    }

    setVisibleReplies(updatedVisibleReplies);
  };


  const renderRepliesNew = (parentCommentId) => {
    const replyComments = comments.filter(comment => comment.parentId === parentCommentId);

    return replyComments.map((reply) => (
      // Render komentar balasan disini
      <div key={reply.id} className="comment-reply d-flex gap-4 my-3">
        {reply.user ? (
          <img
            src={reply.user.avatar || 'default-user-avatar-url'}
            alt={reply.user.username || 'Anonim'}
          />
        ) : reply.admin ? (
          <img
            src={reply.admin.avatar || 'default-admin-avatar-url'}
            alt={reply.admin.name || 'Admin'}
          />
        ) : (
          <div className="avatar-anonim" />
        )}
        <div className="comment-body">
          <div className="comment-head d-flex gap-1">
            {reply.user ? (
              <p>{reply.user.username}</p>
            ) : reply.admin ? (
              <p>{reply.admin.name}</p>
            ) : (
              <p>Anonim</p>
            )}
            <span className="black-dot">•</span>
            <p>{reply.publishedAt}</p>
          </div>
          <p>{reply.contentComment}</p>
        </div>
      </div>
    ));
  };

  const renderReplies = (parentCommentId) => {
    const replyComments = comments.filter(comment => comment.parentId === parentCommentId);

    return replyComments.map((reply) => (
      // Render komentar balasan disini
      <div key={reply.id} className="comment-reply d-flex gap-4 my-3">
        {reply.user ? (
          <img
            src={reply.user.avatar || 'default-user-avatar-url'}
            alt={reply.user.username || 'Anonim'}
          />
        ) : reply.admin ? (
          <img
            src={reply.admin.avatar || 'default-admin-avatar-url'}
            alt={reply.admin.name || 'Admin'}
          />
        ) : (
          <div className="avatar-anonim" />
        )}
        <div className="comment-body">
          <div className="comment-head d-flex gap-1">
            {reply.user ? (
              <p>{reply.user.username}</p>
            ) : reply.admin ? (
              <p>{reply.admin.name}</p>
            ) : (
              <p>Anonim</p>
            )}
            <span className="black-dot">•</span>
            <p>{reply.publishedAt}</p>
          </div>
          <p>{reply.contentComment}</p>
          <div className="btn-reply mt-3 d-flex gap-3">
            <Button variant="outline-primary" onClick={() => handleReplyClick(reply.id)}>
              Balas komentar
            </Button>
            {comments.some(childComment => childComment.parentId === reply.id) && (
              <Button
                className="d-flex gap-2"
                variant="outline-primary"
                onClick={() => handleToggleReplies(reply.id)}
              >
                {visibleReplies.includes(reply.id) ? 'Sembunyikan balasan' : 'Lihat balasan'}
                <i className={`bi bi-chevron-${visibleReplies.includes(reply.id) ? 'up' : 'down'}`} />
              </Button>
            )}
          </div>
          {/* Tampilkan input textarea dan checkbox jika sedang membalas komentar tertentu */}
          {replyingCommentId === reply.id && (
            <Form className="reply-comment mt-3">
              <Form.Group controlId="replyContent">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Balas komentar..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onClick={() => handleReplySubmit(reply.id)}
                />
              </Form.Group>
              <Form.Group controlId="isAnonymousReply" className="m-0 d-flex align-items-center">
                <Form.Check
                  className="d-flex mt-2"
                  type="checkbox"
                  label="Rahasiakan nama (Anonim)"
                  checked={isAnonymousReply}
                  onChange={() => setIsAnonymousReply(!isAnonymousReply)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => handleReplySubmit(reply.id)}>
                Balas
              </Button>
            </Form>
          )}
          {replySubmitted && (
            <p className="reply-submitted-popup">Balasan telah berhasil dikirim!</p>
          )}
          {/* Render balasan untuk balasan (rekursif) */}
          {visibleReplies.includes(reply.id) && renderRepliesNew(reply.id)}
        </div>
      </div>
    ));
  };

  const renderComments = (commentData) => {
    const topLevelComments = commentData.filter(comment => comment.parentId === null);
    return topLevelComments.map((comment) => (
      <div key={comment.id} className="comment-all d-flex mb-3">
        {comment.user ? (
          <img
            src={comment.user.avatar || 'default-user-avatar-url'}
            alt={comment.user.username || 'Anonim'}
          />
        ) : comment.admin ? (
          <img
            src={comment.admin.avatar || 'default-admin-avatar-url'}
            alt={comment.admin.name || 'Admin'}
          />
        ) : (
          <div className="avatar-anonim" />
        )}
        <div className="comment-body">
          <div className="comment-head d-flex gap-1 align-items-center">
            {comment.user ? (
              <p>{comment.user.username}</p>
            ) : comment.admin ? (
              <p>{comment.admin.name}</p>
            ) : (
              <p>Anonim</p>
            )}
            <span className="black-dot">•</span>
            <p>{comment.publishedAt}</p>
          </div>
          <p>{comment.contentComment}</p>
          <div className="btn-reply mt-3 d-flex gap-3">
            <Button variant="outline-primary" onClick={() => handleReplyClick(comment.id)}>
              Balas komentar
            </Button>
            {commentData.some(childComment => childComment.parentId === comment.id) && (
              <Button className="d-flex gap-2" variant="outline-primary" onClick={() => handleToggleReplies(comment.id)}>
                {visibleReplies.includes(comment.id) ? 'Sembunyikan balasan' : 'Lihat balasan'}
                <i className={`bi bi-chevron-${visibleReplies.includes(comment.id) ? 'up' : 'down'}`} />
              </Button>
            )}
          </div>
          {/* Tampilkan input textarea dan checkbox jika sedang membalas komentar tertentu */}
          {replyingCommentId === comment.id && (
            <Form className="reply-comment mt-3">
              <Form.Group controlId="replyContent">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Balas komentar..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onClick={() => handleReplySubmit(comment.id)}
                />
              </Form.Group>
              <Form.Group controlId="isAnonymousReply" className="m-0 d-flex align-items-center">
                <Form.Check
                  className="d-flex mt-2"
                  type="checkbox"
                  label="Rahasiakan nama (Anonim)"
                  checked={isAnonymousReply}
                  onChange={() => setIsAnonymousReply(!isAnonymousReply)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => handleReplySubmit(comment.id)}>
                Balas
              </Button>
            </Form>
          )}
          {replySubmitted && (
            <p className="reply-submitted-popup">Balasan telah berhasil dikirim!</p>
          )}
          {/* Render balasan untuk komentar (rekursif) */}
          {visibleReplies.includes(comment.id) && renderReplies(comment.id)}
        </div>
      </div>
    ));
  };

  const renderMainComments = () => {
    if (laporanDetail && laporanDetail.comment && laporanDetail.comment.length > 0) {
      return renderComments(laporanDetail.comment);
    } else {
      return <p>Tidak ada komentar.</p>;
    }
  };

  const copyToClipboard = () => {
    try {
      const input = document.getElementById("laporan-link");

      if (input) {
        input.select();
        document.execCommand("copy");
        setCopySuccess(true);
      } else {
        console.error("Elemen input tidak ditemukan.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyalin ke clipboard:", error);
    }
  };

  const ImageModal = ({ image, onClose }) => {
    return (
      <Modal show={showImageModal} onHide={() => onClose()}>
        <Modal.Body className="text-center">
          <img src={image} alt="Laporan" />
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    copyToClipboard();
  }, []);


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
                src={laporanDetail.user.avatar}
                alt={`avatar ${laporanDetail.id}`}
                className="avatar"
              />
            ) : (
              <div className="avatar-anonim"></div>
            )}
            <div className="laporan-content">
              <div className="laporan-head d-flex mb-2">
                <div className="badge d-flex gap-2 p-0 align-items-center">
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
                  <div className="clickable-image d-flex gap-2">
                    {laporanDetail.image.map((image, index) => (
                      <img
                        className="img-pop-up"
                        key={index}
                        src={image.path}
                        alt={`laporan-image-${index}`}
                        onClick={() => {
                          setSelectedImage(image.path);
                          setShowImageModal(true);
                        }}
                      />
                    ))}
                  </div>
                )}
                <ImageModal image={selectedImage} onClose={() => setShowImageModal(false)} />

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
              <Button className="btn-respons" variant="outline-primary" onClick={handleLike} disabled={responseGiven}>
                Butuh tanggapan cepat
              </Button>
              <Button className="btn-respons" variant="outline-primary" onClick={handleReport}>
                Laporkan laporan ini
              </Button>
              <Button className="btn-respons" variant="outline-primary" onClick={handleShare}>
                Bagikan
              </Button>
            </div>

            <Modal show={showQuickResponseModal} onHide={() => setShowQuickResponseModal(false)}>
              <Modal.Body className="text-center">
                {responseGiven ? (
                  <p>Anda memberikan bantuan tanggapan cepat</p>
                ) : (
                  <p>Anda telah memberikan bantuan tanggapan cepat pada laporan ini</p>
                )}
              </Modal.Body>
            </Modal>

            <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
              <Modal.Body className="text-center">
                {reportSuccess ? (
                  <p className="report-pop-up">Terima Kasih. Kami akan segera menindak lanjuti laporan ini.</p>
                ) : (
                  <p className="report-pop-up">Anda sudah melaporkan laporan ini.</p>
                )}
              </Modal.Body>
            </Modal>

            <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
              <Modal.Header>
                <Modal.Title>Bagikan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {copySuccess && <p className="mt-2">Berhasil disalin ke clipboard!</p>}
                <p className="mb-1">Tautan Laporan</p>
                <input className="mb-1 input-pop-up">{`https://admin.sadam.bid/laporan/${id}`}</input>
                <Button variant="primary" onClick={copyToClipboard} className="mt-1">
                  Bagikan
                </Button>

              </Modal.Body>
            </Modal>

            <Comment id={id} />
            <div className="comments-section">
              <h4 className="mb-4">Komentar  ({laporanDetail ? laporanDetail.totalComment : 0})</h4>
              {renderMainComments()}
            </div>
          </div>

        </div>
      ) : (
        <Spinner animation="border" className="loader d-flex" />
      )}
    </div>
  );
};

export default LaporanLengkap;