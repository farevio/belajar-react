import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormInput, FormFeedback, Button } from "shards-react";
import { Formik } from 'formik';
import axios from 'axios';

function handleFetchError(setErrorMessage, setSubmitting) {
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            const exitCode = error.response.headers['x-exit'];
            if (exitCode == 'wrongPassword') setErrorMessage('Password salah');
            else if (exitCode == 'wrongUsername') setErrorMessage('Username salah');
            setSubmitting(false);
            return "";
        }
        return error;
    });
}

export default function LoginSsoForm({ userType }) {
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (values, actions) => {
        handleFetchError(setErrorMessage, actions.setSubmitting);
        axios.post('/entrance/login-sso', {
            username: values.username,
            password: values.password
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) window.location = res.data;
            actions.setSubmitting(false);
            return;
        }).catch(err => {
            console.log(err);
        })
    }
    const userLabel = userType == 'student' ? 'Mahasiswa' : 'Dosen';
    return (
        <div>
            <h4>Login SSO {userLabel}</h4>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
            >
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <FormGroup>
                            <label htmlFor="username">Username</label>
                            <FormInput
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.username}
                                name="username"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="password">Password</label>
                            <FormInput
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                            />
                        </FormGroup>
                        <p>{errorMessage}</p>
                        <Button type="submit" block theme="success" disabled={props.isSubmitting}>Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

LoginSsoForm.propTypes = {
    userType: PropTypes.oneOf(['STUDENT', 'LECTURER'])
}