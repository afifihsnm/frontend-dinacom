import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const handleSubmit = async (values) => {
  console.log(values);
};

const ComplaintForm = () => {
  const schema = Yup.object().shape({
    report: Yup.string()
      .min(5, "Judul terlalu pendek")
      .required("Harus diisi"),
    contentReport: Yup.string()
      .required("Harus diisi")
      .min(5, "Laporan terlalu pendek"),
    formFile: Yup.mixed()
      .required("Harus diisi"),
    email: Yup.string("Harus diisi")
      .email("Invalid email format")
      .required("Harus diisi")
  });

  return (
    <div className="Complaint">
      <div className="complaint-header text-center">
        <h5>Yuk, laporin keresahanmu</h5>
        <p>Laporkan keresahanmu di Sadam. Cepat, Aman, Mudah, dan Transparan. </p>
      </div>
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        report: "",
        contentReport: "",
        formFile: "",
        email: ""
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate className="complaint-form" onSubmit={handleSubmit}>
          <Form.Group className="forms-g" controlId="validationReport">
            <Form.Label className="label">
              Nama Lengkap<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="text"
                placeholder="Ketik judul laporan"
                name="report"
                aria-describedby="reportHelpBlock"
                value={values.report}
                onChange={handleChange}
                isInvalid={touched.report && !!errors.report}
              />
              <Form.Control.Feedback type="invalid">
                {errors.report}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text id="reportHelpBlock" muted>
            Buatlah judul yang singkat, padat, dan jelas.
            </Form.Text>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationContentReport">
            <Form.Label className="label">
              Isi Laporan<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-4"
                as="textarea"
                rows={6}
                placeholder="Ketik isi laporan anda"
                name="contentReport"
                value={values.contentReport}
                onChange={handleChange}
                isInvalid={touched.contentReport && !!errors.contentReport}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contentReport}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text id="contentReportHelpBlock" muted>
            Ceritakan keresahanmu dengan jelas dan menggunakan bahasa yang  mudah dimengerti.
            </Form.Text>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationFormFile"
          onClick={() => document.querySelector(".file-field").click()}>
            <Form.Label className="label">
              Unggah Bukti Foto<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="file-field rounded-5"
                type="file" multiple
                accept="image/*"
                placeholder="formFile"
                name="formFile"
                value={values.formFile}
                onChange={handleChange}
                isInvalid={touched.formFile && !!errors.formFile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.formFile}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text id="formFileHelpBlock" muted>
            Ceritakan keresahanmu dengan jelas dan menggunakan bahasa yang  mudah dimengerti.
            </Form.Text>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationEmail">
            <Form.Label className="label">
              Email<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="email"
                placeholder="name@gmail.com"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button className="mt-4" type="submit">
            Daftar
          </Button>
          <p className="text-center m-0 mt-3">
            Sudah punya akun? <Link to="/masuk">Masuk</Link>
          </p>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default ComplaintForm;
