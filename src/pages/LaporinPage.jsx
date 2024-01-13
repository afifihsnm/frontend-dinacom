import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LaporinPage = () => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      // Append each files file to the formData
      values.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      formData.append("name_visibility", Number.name_visibility);
      formData.append("post_visibility", Number.post_visibility);

      const response = await fetch("https://admin.sadam.bid/api/v1/reports", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Failed to create report");
      }

      setResponseMessage(data.message || "Report created successfully");
    } catch (error) {
      console.error("Error creating report:", error.message);
      setResponseMessage("Failed to create report");
    } finally {
      setSubmitting(false);
    }
  };

const schema = Yup.object().shape({
  title: Yup.string().min(5, "Judul terlalu pendek").required("Harus diisi"),
  content: Yup.string().required("Harus diisi").min(5, "Laporan terlalu pendek"),
  files: Yup.array()
    .of(Yup.mixed().test("fileSize", "Ukuran file terlalu besar", (value) => !value || (value && value.size <= 5242880))),
    name_visibility: Yup.number().oneOf([0, 1], "Harus dipilih").required("Harus dipilih"),
    post_visibility: Yup.number().oneOf([0, 1], "Harus dipilih").required("Harus dipilih"),
});


  return (
    <div className="laporin">
      <div className="laporin-content">
        <h1>Laporin</h1>
        <p className="mb-4">
          Buatlah laporan yang mudah dimengerti & dipercaya dengan cara menggunakan bahasa yang mudah dipahami dan sertakan bukti foto untuk memperkuat laporan yang telah kamu buat.
        </p>
        <div className="response-message">{responseMessage}</div>
        <div className="Laporin Form">
          <div className="Complaint my-4">
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                title: "",
                content: "",
                files: [],
                name_visibility: false,
                post_visibility: false,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                touched,
                errors,
              }) => (
                <Form noValidate className="laporin-form" onSubmit={handleSubmit}>
                  <Form.Group className="forms-g" controlId="validationReport">
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
                    <Form.Text id="reportHelpBlock" muted>
                      Buatlah judul yang singkat, padat, dan jelas.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className="forms-g"
                    controlId="validationContentReport"
                  >
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
                      Ceritakan keresahanmu dengan jelas dan menggunakan bahasa
                      yang mudah dimengerti.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="forms-g" controlId="validationFormFile">
  <Form.Label className="label">
    Unggah Bukti Foto<span className="red-dot">*</span>
  </Form.Label>
  <InputGroup className="mb-1">
    <FormControl
      type="file"
      multiple
      className="file-field rounded-5"
      accept="files/*"
      name="files"
      onChange={(event) => {
        // Convert FileList to an array
        const filesArray = Array.from(event.currentTarget.files);
        setFieldValue("files", filesArray);

        // Clear validation error for files field
        setFieldError("files", "");
      }}
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

                  <Form.Group
                    className="forms-g"
                    controlId="validationShowName"
                  >
                    <Form.Label className="label">
                      Apakah Anda ingin menampilkan nama Anda
                      <span className="red-dot">*</span>
                    </Form.Label>
                    <Form.Check
                      required
                      className="d-flex mb-1"
                      type="radio"
                      name="name_visibility"
                      label="Ya!, saya ingin menampilkan nama pada laporan"
                      onChange={handleChange}
                      isInvalid={!!errors.name_visibility}
                      feedback={errors.name_visibility}
                      feedbackType="invalid"
                    />
                    <Form.Check
                      required
                      className="d-flex mb-1"
                      type="radio"
                      name="name_visibility"
                      label="Tidak, saya ingin merahasiakan nama saya"
                      onChange={handleChange}
                      isInvalid={!!errors.name_visibility}
                      feedback={errors.name_visibility}
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <Form.Group
                    className="forms-g"
                    controlId="validationShowStatus"
                  >
                    <Form.Label className="label">
                      Siapakah yang dapat melihat/ menanggapi laporan ini
                      <span className="red-dot">*</span>
                    </Form.Label>
                    <Form.Check
                      required
                      className="d-flex mb-1"
                      type="radio"
                      name="post_visibility"
                      label="Hanya saya dan instansi"
                      onChange={handleChange}
                      isInvalid={!!errors.post_visibility}
                      feedback={errors.post_visibility}
                      feedbackType="invalid"
                    />
                    <Form.Check
                      required
                      className="d-flex mb-1"
                      type="radio"
                      name="post_visibility"
                      label="Saya ingin laporan ini dapat ditanggapi oleh instansi dan publik"
                      onChange={handleChange}
                      isInvalid={!!errors.post_visibility}
                      feedback={errors.post_visibility}
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <Button className="mt-4" type="submit">
                    Kirim Laporan
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
