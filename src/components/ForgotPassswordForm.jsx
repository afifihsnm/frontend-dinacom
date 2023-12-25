import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordForm = ({ onEmailSent, onFormReset }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setIsEmailSent(true);
    onEmailSent(values.email);
    setSubmitting(false);
  };

  const handleResendEmail = async () => {
    setIsEmailSent(false);
    onFormReset(); // Panggil callback onFormReset untuk mereset formulir
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit} className='fpass-form'>
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
              <Form.Group className='forms-g' controlId="validationEmail">
                <Form.Label className='label'>Email</Form.Label>
                <InputGroup className="mb-1">
                  <FormControl className='rounded-5 mb-3'
                    type="email"
                    placeholder="name@gmail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button type="submit" disabled={isSubmitting}>
                Kirim
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;