import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpForm = ({ onSignUpSuccess}) => {

  const handleSubmit = (values, { setSubmitting }) => {
    localStorage.setItem('registrationData', JSON.stringify(values));

    if (onSignUpSuccess) {
      onSignUpSuccess();
    }

    setSubmitting(false);
  };

  const schema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Mininum 3 karakter")
      .required("Wajib diisi"),
    dateOfBirth: Yup.date()
      .required("Wajib diisi"),
    addres: Yup.string()
      .required("Wajib diisi")
      .min(3, "Tempat tinggal terlalu pendek"),
    username: Yup.string()
      .min(3, "Minimum 3 karakter")
      .required("Wajib diisi"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Wajib diisi"),
    password: Yup.string().min(8, "Minimum 8 karakter").required("Wajib diisi"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Kata sandi tidak sama")
      .required("Wajib diisi")
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        fullName: "",
        dateOfBirth: "",
        addres: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isInvalid={touched.fullName && !!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
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
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={handleChange}
                isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
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
                name="addres"
                value={values.addres}
                onChange={handleChange}
                isInvalid={touched.addres && !!errors.addres}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addres}
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
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
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
