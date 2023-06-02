import React, {useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import './login.scss';
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from "../../store/slices/authSlice.js";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loading from "../../components/loading/Loading.jsx";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {

        if (isLoading) {
            return (<Loading/>)
        }

        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast("Вас успішно авторизовано!")
        }

        if (isSuccess || token) {
            navigate('/')
        }

        dispatch(reset())

    }, [token, isSuccess, isError, message, navigate, dispatch])

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = (values) => {
        dispatch(login(values))
    };

    const validateForm = values => {
        const errors = {};

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
            <Form  className="login-form">
                    <h2>Вхід</h2>

                    <div className="form-group">
                        <label htmlFor="email">Електронна пошта</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                        />
                        <ErrorMessage name="email" component="div" className="error"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                        />
                        <ErrorMessage name="password" component="div" className="error"/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Увійти
                    </button>
                    <p>Немає аккаунту? <Link to={"/register"}><span>Зареєструватися</span></Link></p>
            </Form>
        </Formik>
    );
};

export default Login;