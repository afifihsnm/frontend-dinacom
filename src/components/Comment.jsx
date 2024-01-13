import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Comment() {
    const { id } = useParams();
    const [data, setData] = useState({
        content: '',
        name_visibility: 0, // Set default name_visibility as 0
    });

    const handleInput = (event) => {
        let value = event.target.value;

        if (event.target.name === 'name_visibility') {
            // Convert the string value to a number (0 or 1)
            value = value === 'true' ? 1 : 0;
        }

        setData({ ...data, [event.target.name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        // Validasi input sebelum mengirim ke server
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

                const responseData = response.data;

                console.log('Comment submitted successfully');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="laporan-tanggapan">
            <div className="tanggapan mt-3 d-flex flex-column">
                <Form onSubmit={handleSubmit}>
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
        </div>
    );
}

export default Comment;