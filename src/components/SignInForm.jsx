import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = Yup.object().shape({
    username: Yup.string().min(3, "Minimum 3 karakter").required("Harus diisi"),
    password: Yup.string().min(8, "Minimum 8 characters").required(),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    setIsSubmitting(false);
  };

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

          <Button type="submit" disabled={isSubmitting}>
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
