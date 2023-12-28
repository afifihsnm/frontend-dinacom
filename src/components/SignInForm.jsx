import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";


const SignInForm = ({ onLoginSuccess }) => {
  let navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Login data:', values);

    // Memeriksa apakah data pendaftaran sudah ada di local storage
    const registrationData = localStorage.getItem('registrationData');

    if (registrationData) {
      const userData = JSON.parse(registrationData);
      if (values.username === userData.username && values.password === userData.password) {
        // login berhasil
        console.log('Login berhasil');
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }

        navigate('/dashboard');
      } else {
        // Login gagal
        console.log('Login gagal: Username atau password tidak cocok');
      }
    } else {
      // Data pendaftaran tidak ditemukan
      console.log('Registration data not found');
    }

    setSubmitting(false);
  };

  const schema = Yup.object().shape({
    username: Yup.string().min(3, "Minimum 3 karakter").required("Wajib diisi"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Wajib diisi"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate className="signin-form" onSubmit={handleSubmit}>
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

          <Form.Group className="forms-g mb-3" controlId="validationPassword">
            <Form.Label className="label">
              Kata Sandi<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                className="rounded-5"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
            <Link to="/lupa-sandi">Lupa Kata Sandi?</Link>
          </Form.Group>

          <Button type="submit">
            Masuk
          </Button>
          <p className="text-center m-0 mt-3">
            Belum punya akun? <Link to="/daftar">Daftar</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
