import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Comment() {
    const { id } = useParams();
    const [data, setData] = useState({
        content: '',
        name_visibility: 1,
    });
    const [commentSubmitted, setCommentSubmitted] = useState(false); // State untuk menandai pengiriman komentar

    const handleInput = (event) => {
        let value = event.target.value;

        if (event.target.name === 'name_visibility') {
            value = event.target.checked ? 0 : 1;
        }

        setData({ ...data, [event.target.name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        if (!data.content.trim() || data.name_visibility === '') {
            console.log('Content and name_visibility cannot be empty');
            return;
        }

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.post(`https://admin.sadam.bid/api/v1/reports/${id}/comments`, data, { headers })
            .then(response => {
                console.log(response.data);

                // Tandai bahwa komentar telah berhasil dikirim
                setCommentSubmitted(true);

                // Reset nilai formulir
                setData({
                    content: '',
                    name_visibility: 0,
                });

                // Setelah beberapa detik, reset status pengiriman komentar
                setTimeout(() => {
                    setCommentSubmitted(false);
                }, 3000);

                console.log('Comment submitted successfully');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="tanggapan mt-3 d-flex flex-column">
            {commentSubmitted && <div className="alert alert-success">Komentar berhasil dikirim!</div>}
            <Form onSubmit={handleSubmit} className='mb-4'>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>
                        Berikan tanggapan/komentar mengenai permasalahan pada laporan ini.
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ketik tanggapan anda"
                        name="content"
                        aria-describedby="tanggapanHelp"
                        onChange={handleInput}
                    />
                    <Form.Text id="tanggapanHelp" muted>
                        Berikan tanggapan yang membantu menyelesaikan masalah.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-1" controlId="checkTanggapan">
                    <Form.Check
                        type="checkbox"
                        label="Rahasiakan nama (Anonim)"
                        className="d-flex align-items-center"
                        name="name_visibility"
                        onChange={handleInput}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Kirim
                </Button>
            </Form>
        </div>
    );
}

export default Comment;