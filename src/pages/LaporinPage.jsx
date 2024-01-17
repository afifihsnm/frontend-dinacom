import { Form, InputGroup, FormControl, Button, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

function DropzoneWithoutClick({ onFilesChange }) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const accept = [".jpeg", ".jpg", ".png"];

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      onFilesChange(acceptedFiles);
      // Handle file rejections (e.g., file size exceeded, invalid file type)
      if (fileRejections.length > 0) {
        console.log('File rejected:', fileRejections);
        // You can add user-friendly error messages or other handling here
      }
    },
    maxSize,
    accept: accept.join(','),
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path} className="list-file">
      <i className="bi bi-image" /> {file.path}
    </li>
  ));

  return (
    <section className="file-input d-flex flex-column gap-1">
      <div {...getRootProps({ className: 'dropzone align-items-center py-4 rounded-4 gap-2 d-flex flex-column' })}>
        <input {...getInputProps()} />
        <i className="bi bi-upload" />
        <p className="text-input">Unggah bukti foto (MAX 5MB, JPEG, PNG)</p>
      </div>
      {acceptedFiles.length > 0 && (
        <div className="ul-list-file">
          <ul className="d-flex py-4 px-3 m-0 flex-column gap-2">{files}</ul>
        </div>
      )}
      {fileRejections.length > 0 && (
        <div className="alert alert-danger mt-2" role="alert">
          {fileRejections.map(({ file, errors }) => (
            <p key={file.path}>
              {file.path} - {errors.map(e => e.message).join(', ')}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}


const LaporinPage = () => {
  const token = localStorage.getItem('token');
  let navigate = useNavigate();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!token) {
    navigate('/');
  }

  const handleFilesChange = (files) => {
    setAcceptedFiles(files);
  };

  const postForm = useState({
    title: "",
    content: "",
    name_visibility: "",
    post_visibility: "",
    files: []
  });

  const handleSubmit = async (postForm, { setSubmitting }) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
  
   // Append Dropzone files to formData
   acceptedFiles.forEach(file => {
    formData.append('files[]', file);
  });
  
      // Append other form data to formData
      formData.append('title', postForm.title);
      formData.append('content', postForm.content);
      formData.append('name_visibility', postForm.name_visibility);
      formData.append('post_visibility', postForm.post_visibility);
  
    try {
      const response = await fetch('https://admin.sadam.bid/api/v1/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
      setSubmitSuccess(true);

    } catch (error) {
      console.error('Error during submit:', error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const schema = Yup.object().shape({
    title: Yup.string().min(5, "Judul terlalu pendek").required("Harus diisi"),
    content: Yup.string().required("Harus diisi").min(5, "Laporan terlalu pendek"),
    name_visibility: Yup.string().required('Wajib memilih salah satu'),
    post_visibility: Yup.string().required('Wajib memilih salah satu'),
  });

  return (
    <div className="laporin">
      <div className="laporin-content">
        <h1>Laporin</h1>
        <p className="mb-4">
          Buatlah laporan yang mudah dimengerti & dipercaya dengan cara menggunakan bahasa yang mudah dipahami dan sertakan bukti foto untuk memperkuat laporan yang telah kamu buat.
        </p>
        {submitSuccess && (
          <div className="alert alert-success mt-4" role="alert">
            <p className="font-weight-bold">Yey, Laporanmu sudah terkirim.</p><br/>
            <p>Untuk mengetahui tanggapan dari instansi, Anda bisa cek Pesan secara berkala. Terima Kasih.</p>
          </div>
        )}
        <div className="Laporin Form">
          <div className="Complaint my-4">
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                title: "",
                content: "",
                name_visibility: "",
                post_visibility: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate className="laporin-form" onSubmit={handleSubmit}>
                  <Form.Group className="forms-g" controlId="validationTitle">
                    <Form.Label className="label">
                      Judul Laporan<span className="red-dot">*</span>
                    </Form.Label>
                    <InputGroup className="mb-1">
                      <FormControl
                        className="rounded-5"
                        type="text"
                        placeholder="Ketik judul laporan"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={touched.title && !!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Text id="reportHelpBlock" muted>
                      Buatlah judul yang singkat, padat, dan jelas.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="forms-g" controlId="validationContent">
                    <Form.Label className="label">
                      Isi Laporan<span className="red-dot">*</span>
                    </Form.Label>
                    <InputGroup className="mb-1">
                      <FormControl
                        className="rounded-4 text-area"
                        type="text"
                        rows={3}
                        as="textarea"
                        placeholder="Ketik isi laporan Anda"
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
                      Ceritakan keresahanmu dengan jelas dan menggunakan bahasa
                      yang mudah dimengerti.
                    </Form.Text>
                  </Form.Group>

                  <FormGroup>
                  <Form.Label className="label">
                      Unggah Bukti Foto
                      <span className="red-dot">*</span>
                    </Form.Label>
                  <DropzoneWithoutClick onFilesChange={handleFilesChange} />
                  <Form.Text id="contentHelpBlock" muted>
                     Unggah bukti agar memperkuat laporanmu.
                    </Form.Text>
                  </FormGroup>
                  <Form.Group className="forms-g" controlId="name_visibility">
                    <Form.Label className="label">
                      Apakah Anda ingin menampilkan nama Anda
                      <span className="red-dot">*</span>
                    </Form.Label>
                    <div className="mb-1">
                      <Form.Check
                        type="radio"
                        label="Ya!, saya ingin menampilkan nama pada laporan"
                        value="1"
                        id="showNameYes"
                        name="name_visibility"
                        onChange={handleChange}
                        isInvalid={touched.name_visibility && !!errors.name_visibility}
                      />
                      <Form.Check
                        type="radio"
                        label="Tidak, saya ingin merahasiakan nama saya"
                        value="0"
                        id="showNameNo"
                        name="name_visibility"
                        onChange={handleChange}
                        isInvalid={touched.name_visibility && !!errors.name_visibility}
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.name_visibility}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="forms-g" controlId="post_visibility">
                    <Form.Label className="label">
                    Siapakah yang dapat melihat/ menanggapi laporan ini
                      <span className="red-dot">*</span>
                    </Form.Label>
                    <div className="mb-1">
                      <Form.Check
                        type="radio"
                        label="Hanya saya dan instansi"
                        value="0"
                        id="showPostNo"
                        name="post_visibility"
                        onChange={handleChange}
                        isInvalid={touched.post_visibility && !!errors.post_visibility}
                      />
                      <Form.Check
                        type="radio"
                        label="Saya ingin laporan ini dapat ditanggapi oleh instansi dan publik"
                        value="1"
                        id="showPostYes"
                        name="post_visibility"
                        onChange={handleChange}
                        isInvalid={touched.post_visibility && !!errors.post_visibility}
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.post_visibility}
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Button className="mt-4" type="submit">
                    Kirim
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporinPage;
