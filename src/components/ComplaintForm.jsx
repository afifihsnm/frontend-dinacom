import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const API_URL = 'https://admin.sadam.bid/api/v1/reports'
const API_METHOD = 'POST'
const STATUS_IDLE = 0
const STATUS_UPLOADING = 1

const ComplaintForm = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(STATUS_IDLE);

  useEffect(() => {
    console.log("Files updated:", files);
  }, [files]);

  const uploadFiles = (data) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
  
    setStatus(STATUS_UPLOADING);
  
    fetch(API_URL, {
      method: API_METHOD,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
      .finally(() => setStatus(STATUS_IDLE));
  };

  const packFiles = () => {
    const data = new FormData();
  
    // Ubah FileList menjadi array
    const filesArray = Array.from(files);
  
    filesArray.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  
    return data;
  };

  const handleUploadClick = () => {
    if (files.length) {
      const data = packFiles();
      uploadFiles(data);
    }
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Judul terlalu pendek")
      .required("Harus diisi"),
    content: Yup.string()
      .required("Harus diisi")
      .min(5, "Laporan terlalu pendek"),
    files: Yup.mixed()
      .required("Harus diisi"),
    name_visibility: Yup.boolean().required("Harus diisi"),
    post_visibility: Yup.boolean().required("Harus diisi"),
  });


  const handleSubmit = async (values) => {
    try {
      const data = packFiles(); 
      const response = await fetch(API_URL, {
        method: API_METHOD,
        body: data,
      });

      const responseData = await response.json();

      if (response.ok) {
        // Formulir berhasil dikirim
        console.log("Laporan berhasil dikirim:", responseData);
        // Lakukan apa yang diperlukan setelah berhasil mengirim formulir
      } else {
        // Ada kesalahan dalam pengiriman formulir
        console.error("Gagal mengirim laporan:", responseData.message);
        // Lakukan apa yang diperlukan jika pengiriman gagal
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      // Lakukan apa yang diperlukan jika terjadi kesalahan
    }
  };

  return (
    <div className="Complaint-Form">
   <div className="Complaint my-4">
      <div className="complaint-header text-center overflow-hidden">
        <h5 data-aos="fade-up" data-aos-duration="900">Yuk, laporin keresahanmu</h5>
        <p data-aos="fade-up" data-aos-duration="1000">Laporkan keresahanmu di Sadam. Cepat, Aman, Mudah, dan Transparan. </p>
      </div>
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        title: "",
        content: "",
        files: "",
        name_visibility: 0,
        post_visibility: 0,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate className="complaint-form" data-aos="fade-up" data-aos-duration="1000" onSubmit={handleSubmit}>
          <Form.Group className="forms-g" controlId="title">
            <Form.Label className="label">
              Judul Laporan<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="text"
                placeholder="Ketik judul laporan"
                name="title"
                aria-describedby="titleHelpBlock"
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text id="titleHelpBlock" muted>
            Buatlah judul yang singkat, padat, dan jelas.
            </Form.Text>
          </Form.Group>

          <Form.Group className="forms-g" controlId="content">
            <Form.Label className="label">
              Isi Laporan<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-4"
                as="textarea"
                rows={6}
                placeholder="Ketik isi laporan anda"
                name="content"
                value={values.content}
                onChange={handleChange}
                isInvalid={touched.content && !!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text id="contentHelpBlock" muted>
            Ceritakan keresahanmu dengan jelas dan menggunakan bahasa yang  mudah dimengerti.
            </Form.Text>
          </Form.Group>

          <Form.Group className="forms-g" controlId="files">
        <Form.Label className="label">
          Unggah Bukti Foto<span className="red-dot">*</span>
        </Form.Label>
        <InputGroup className="mb-1">
          <FormControl
            className="file-field rounded-5"
            type="file"
            multiple
            accept="files/*"
            placeholder="files"
            name="files"
            onChange={(e) => setFiles(e.target.files)}
            isInvalid={touched.files && !!errors.files}
          />
          <Form.Control.Feedback type="invalid">
            {errors.files}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text id="filesHelpBlock" muted>
          Unggah bukti agar memperkuat laporanmu.
        </Form.Text>
      </Form.Group>
        
        <Form.Group className="forms-g" controlId="name_visibility">
        <Form.Label className="label">
        Siapakah yang dapat melihat/ menanggapi laporan ini<span className="red-dot">*</span>
        </Form.Label>
        <Form.Check className="d-flex mb-1" type="radio" name="name_visibility" label="Hanya saya dan instansi" />
        <Form.Check className="d-flex mb-1" type="radio" name="name_visibility" label="Saya ingin laporan ini dapat ditanggapi oleh instansi dan publik" />
      </Form.Group>

        <Form.Group className="forms-g" controlId="post_visibility">
        <Form.Label className="label">
        Siapakah yang dapat melihat/ menanggapi laporan ini<span className="red-dot">*</span>
        </Form.Label>
        <Form.Check className="d-flex mb-1" type="radio" name="post_visibility" label="Hanya saya dan instansi" />
        <Form.Check className="d-flex mb-1" type="radio" name="post_visibility" label="Saya ingin laporan ini dapat ditanggapi oleh instansi dan publik" />
      </Form.Group>
      
      <Button className="mt-4" type="submit" onClick={handleUploadClick} disabled={status === STATUS_UPLOADING}>
        {status === STATUS_IDLE ? "Kirim Laporan" : <img src="./load.svg" alt="Loading" />}
      </Button>
        </Form>
      )}
    </Formik>
    </div>
    </div>
  );
};

export default ComplaintForm;
