import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
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
    showName: Yup.boolean().required("Harus diisi"),
    showStatus: Yup.boolean().required("Harus diisi"),
  });

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
        report: "",
        contentReport: "",
        formFile: "",
        showName: true,
        showStatus: true
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate className="complaint-form" data-aos="fade-up" data-aos-duration="1000" onSubmit={handleSubmit}>
          <Form.Group className="forms-g" controlId="report">
            <Form.Label className="label">
              Judul Laporan<span className="red-dot">*</span>
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

          <Form.Group className="forms-g" controlId="contentReport">
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

          <Form.Group className="forms-g" controlId="formFile">  
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
            Unggah bukti agar memperkuat laporanmu.
            </Form.Text>
          </Form.Group>   

          <Form.Group className="forms-g" controlId="showName">
          <Form.Label className="label">
            Apakah Anda ingin menampilkan nama Anda<span className="red-dot">*</span>
          </Form.Label>
          <Form.Check className="d-flex mb-1" type="radio" name="showName" value="true" label="Ya!, saya ingin menampilkan nama pada laporan" />
          <Form.Check className="d-flex mb-1" type="radio" name="showName" value="false" label="Tidak, saya ingin merahasiakan nama saya" />
        </Form.Group>
        
        <Form.Group className="forms-g" controlId="ShowStatus">
        <Form.Label className="label">
        Siapakah yang dapat melihat/ menanggapi laporan ini<span className="red-dot">*</span>
        </Form.Label>
        <Form.Check className="d-flex mb-1" type="radio" name="ShowStatus" value="true" label="Hanya saya dan instansi" />
        <Form.Check className="d-flex mb-1" type="radio" name="ShowStatus" value="false" label="Saya ingin laporan ini dapat ditanggapi oleh instansi dan publik" />
      </Form.Group>

          <Button className="mt-4" type="submit">
            Kirim Laporan
          </Button>
        </Form>
      )}
    </Formik>
    </div>
    </div>
  );
};

export default ComplaintForm;
