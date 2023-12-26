import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const NewPassForm = ({ onEmailSent, onFormReset }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const schema = Yup.object().shape({
    password: Yup.string().min(8, "Minimum 8 characters").required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password tidak sama")
      .required(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setIsEmailSent(true);
    onEmailSent(values.email);
    setSubmitting(false);
  };

  const handleResendEmail = async () => {
    setIsEmailSent(false);
    onFormReset();
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="newpass-form">
          {isEmailSent ? (
            <div>
              <p>
                Link ganti kata sandi telah kami kirimkan ke {values.email}
                <span className="resend-link" onClick={handleResendEmail}>
                  Belum menerima email balasan? Kirim Ulang
                </span>
              </p>
            </div>
          ) : (
            <div>
              <Form.Group
                className="forms-g mb-3"
                controlId="validationNewPassword"
              >
                <Form.Label className="label">Kata Sandi</Form.Label>
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
                controlId="validationConfirmNewPassword"
              >
                <Form.Label className="label">Konfirmasi Kata Sandi</Form.Label>
                <InputGroup className="mb-1">
                  <FormControl
                    className="rounded-5"
                    type="password"
                    placeholder="Konfirmasi kata sandi"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button type="submit" disabled={isSubmitting}>
                Ganti Kata Sandi
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NewPassForm;
