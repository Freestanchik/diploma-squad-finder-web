import React, {useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import './registration.scss';
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../../store/slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loading from "../../components/loading/Loading.jsx";

const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {

        if (isLoading) {
            return (<Loading/>)
        }

        if (isSuccess) {
            toast("Вас успішно зареєстровано!")
        }

        if (isError) {
            toast.error(message)
        }

        if (isSuccess || token) {
            navigate('/')
        }

        dispatch(reset())

    }, [token, isSuccess, isError, message, navigate, dispatch])

    const initialValues = {
        login: '',
        email: '',
        password: ''
    };

    const handleSubmit = (values) => {
        dispatch(register(values))
    };

    const validateForm = values => {
        const errors = {};

        if (!values.login) {
            errors.login = 'Login is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        return errors;
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="registration-form">
                    <h2>Реєстрація</h2>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <Field
                            type="text"
                            id="login"
                            name="login"
                            className="form-control"
                        />
                        <ErrorMessage name="login" component="div" className="error"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                        />
                        <ErrorMessage name="email" component="div" className="error"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                        />
                        <ErrorMessage name="password" component="div" className="error"/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default Registration;
