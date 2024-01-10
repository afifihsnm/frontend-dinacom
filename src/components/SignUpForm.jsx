import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpForm = ( ) => {
  let navigate = useNavigate();

  const signUp = useState({
    nama_lengkap: "",
    tanggal_lahir: "",
    tempat_tinggal: "",
    username: "",
    email: "",
    password: "",
    password_konfirmasi: "",
  });

  const handleSubmit = async (signUp, { setSubmitting }) => {
    try {
      const response = await fetch('https://admin.sadam.bid/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUp),
      }).then(res => res.json()).then(console.log);

    } catch (error) {
      console.error('Error during sign up:', error);
    }  finally {
      setSubmitting(false);
      navigate('/masuk');
    }
    
  };

  const schema = Yup.object().shape({
    nama_lengkap: Yup.string()
      .min(3, "Mininum 3 karakter")
      .required("Wajib diisi"),
    tanggal_lahir: Yup.date()
      .required("Wajib diisi"),
    tempat_tinggal: Yup.string()
      .required("Wajib diisi")
      .min(3, "Tempat tinggal terlalu pendek"),
    username: Yup.string()
      .min(3, "Minimum 3 karakter")
      .required("Wajib diisi"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Wajib diisi"),
    password: Yup.string().min(8, "Minimum 8 karakter").required("Wajib diisi"),
    password_konfirmasi: Yup.string()
    .oneOf([Yup.ref("password"), null], "Kata sandi tidak sama")
      .required("Wajib diisi")
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        nama_lengkap: "",
        tanggal_lahir: "",
        tempat_tinggal: "",
        username: "",
        email: "",
        password: "",
        password_konfirmasi: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate className="signup-form" onSubmit={handleSubmit}>
          <Form.Group className="forms-g" controlId="validationFullName">
            <Form.Label className="label">
              Nama Lengkap<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="text"
                placeholder="Nama"
                name="nama_lengkap"
                value={values.nama_lengkap}
                onChange={handleChange}
                isInvalid={touched.nama_lengkap && !!errors.nama_lengkap}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nama_lengkap}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationDateOfBirth">
            <Form.Label className="label">
              Tanggal lahir<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="date"
                placeholder="11/12/2023"
                name="tanggal_lahir"
                value={values.tanggal_lahir}
                onChange={handleChange}
                isInvalid={touched.tanggal_lahir && !!errors.tanggal_lahir}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tanggal_lahir}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationAddres">
            <Form.Label className="label">
              Tempat tinggal<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="text"
                placeholder="Alamat sekarang"
                name="tempat_tinggal"
                value={values.tempat_tinggal}
                onChange={handleChange}
                isInvalid={touched.tempat_tinggal && !!errors.tempat_tinggal}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tempat_tinggal}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="forms-g" controlId="validationUsername">
            <Form.Label className="label">
              Username<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
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

          <Form.Group className="forms-g mb-3" controlId="validationPassword">
            <Form.Label className="label">
              Kata Sandi<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="password"
                placeholder="Masukkan kata sandi"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="forms-g mb-3"
            controlId="validationConfirmPassword"
          >
            <Form.Label className="label">
              Konfirmasi Kata Sandi<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="password"
                placeholder="Konfirmasi kata sandi"
                name="password_konfirmasi"
                value={values.password_konfirmasi}
                onChange={handleChange}
                isInvalid={touched.password_konfirmasi && !!errors.password_konfirmasi}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password_konfirmasi}
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
  );
};

export default SignUpForm;