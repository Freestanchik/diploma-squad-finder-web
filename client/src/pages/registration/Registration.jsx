import React, {useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import './registration.scss';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../../store/slices/authSlice.js';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Loading from '../../components/loading/Loading.jsx';

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoading) {
            return <Loading/>;
        }

        if (isSuccess) {
            toast('Вас успішно зареєстровано!');
        }

        if (isError) {
            toast.error(message);
        }

        if (isSuccess || token) {
            navigate('/');
        }

        dispatch(reset());
    }, [token, isSuccess, isError, message, navigate, dispatch]);

    const initialValues = {
        login: '',
        email: '',
        password: '',
        confirmPassword: '',
        discordNickname: '',
        sex: '',
        dateOfBirth: '',
        favouriteGenre: '',
        additionalInfo: '',
    };

    const handleSubmit = (values) => {
        const { confirmPassword, ...data } = values;
        console.log(data)
        dispatch(register(data));
    };

    const validateForm = (values) => {
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

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!values.discordNickname) {
            errors.discordNickname = 'Discord Nickname is required';
        }

        return errors;
    };

    return (
        <Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <Form className="registration-form">
                <h2>Реєстрація</h2>
                <div className="form-group">
                    <label htmlFor="login" className="required">Логін</label>
                    <Field type="text" id="login" name="login" className="form-control"/>
                    <ErrorMessage name="login" component="div" className="error"/>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="required">Електрона пошта</label>
                    <Field type="email" id="email" name="email" className="form-control"/>
                    <ErrorMessage name="email" component="div" className="error"/>
                </div>

                <div className="form-passwords">
                    <div className="form-group">
                        <label htmlFor="password" className="required">Пароль</label>
                        <Field type="password" id="password" name="password" className="form-control"/>
                        <ErrorMessage name="password" component="div" className="error"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="required">Підтвердження паролю</label>
                        <Field type="password" id="confirmPassword" name="confirmPassword"
                               className="form-control"/>
                        <ErrorMessage name="confirmPassword" component="div" className="error"/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="discordNickname" className="required">Діскорд нікнейм</label>
                    <Field type="text" id="discordNickname" name="discordNickname" className="form-control"/>
                    <ErrorMessage name="discordNickname" component="div" className="error"/>
                </div>

                <div className="form-add-vals">
                    <div className="form-group">
                        <label htmlFor="sex">Стать</label>
                        <Field as="select" id="sex" name="sex" className="form-control">
                            <option value="">Не важливо</option>
                            <option value="чоловіча">Чоловіча</option>
                            <option value="жіноча">Жіноча</option>
                        </Field>
                        <ErrorMessage name="sex" component="div" className="error"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Дата народження</label>
                        <Field type="date" id="dateOfBirth" name="dateOfBirth" className="form-control"/>
                        <ErrorMessage name="dateOfBirth" component="div" className="error"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="favouriteGenre">Улюблений жанр</label>
                        <Field as="select" id="favouriteGenre" name="favouriteGenre" className="form-control">
                            <option value="action">Action</option>
                            <option value="adventure">Adventure</option>
                            <option value="rpg">RPG</option>
                            <option value="strategy">Strategy</option>
                            <option value="sports">Sports</option>
                        </Field>
                        <ErrorMessage name="favouriteGenre" component="div" className="error"/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="additionalInfo">Додаткова інформація</label>
                    <Field as="textarea" id="additionalInfo" name="additionalInfo" className="form-control--textarea"/>
                    <ErrorMessage name="additionalInfo" component="div" className="error"/>
                </div>

                <button type="submit" className="btn btn-primary">
                    Зареєструватися
                </button>
            </Form>
        </Formik>
    );
};

export default Registration;