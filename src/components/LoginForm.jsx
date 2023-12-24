// LoginForm.js
import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

const LoginForm = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: '',
        password: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form className='signin' onSubmit={handleSubmit}>
          <Form.Group className='forms-g' controlId="validationUsername">
            <Form.Label className='label'>Username<span className='red-dot'>*</span></Form.Label>
            <InputGroup className='mb-1'>
              <FormControl
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="forms-g mb-3" controlId="validationPassword">
            <Form.Label className='label'>Kata Sandi<span className='red-dot'>*</span></Form.Label>
            <InputGroup className='mb-1'>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            </InputGroup>
            <Link to="/lupa-sandi">Lupa Kata Sandi?</Link>
          </Form.Group>
          <Button type="submit">Masuk</Button>
          <p className='text-center m-0 mt-3'>Belum punya akun? <Link to="/daftar">Daftar</Link></p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;