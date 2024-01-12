import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const SignInForm = ({ onLoginSuccess }) => {
  let navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('https://admin.sadam.bid/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Login berhasil:', responseData);

        localStorage.setItem('token', responseData.authorization.token);

        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate('/dashboard');
        } else {
        const responseData = await response.json();
        console.log('Login gagal:', responseData);
        setLoginError(responseData.message); 
        setHasError(true); 
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      setLoginError('Terjadi kesalahan saat login');
      setHasError(true); 
    } finally {
      setSubmitting(false);
    }
  };
  

  const schema = Yup.object().shape({
    username: Yup.string().min(3, "Minimum 3 karakter").required("Wajib diisi"),
    password: Yup.string().min(8, "Minimum 8 karakter").required("Wajib diisi"),
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
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <Form noValidate className="signin-form" onSubmit={handleSubmit}>

          {loginError && (
            <p className="text-danger"><i className="bi bi-exclamation-circle mx-2" />Sepertinya ada yang salah</p>
          )}

          <Form.Group className="forms-g" controlId="validationUsername">
            <Form.Label className="label">
              Username<span className="red-dot">*</span>
            </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
  className={`rounded-5 ${hasError ? 'border-danger' : ''}`}
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
  className={`rounded-5 ${hasError ? 'border-danger' : ''}`}
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

          <Button className="mt-4" type="submit" disabled={isSubmitting}>
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
