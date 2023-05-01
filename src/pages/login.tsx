import React, {useState, useRef, useCallback, useEffect, FC, ChangeEvent, FormEvent} from 'react';
import { useSelector, useDispatch } from "react-redux";

import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { login, userSlice } from '../services/slices/user';

import { useLocation, useNavigate } from 'react-router-dom';
import {FORGOT_PASSWORD, REGISTER} from "../utils/routes-constants";
import formStyles from "../components/form/form.module.css";

export const LoginPage: FC = () => {
    const dispatch = useDispatch();

    const {
        userRequest,
        userSuccess,
        userFailed
    } = useSelector(
        // @ts-ignore
        state => state.user
    );
    const { resetStatus } = userSlice.actions;

    const location = useLocation();
    const navigate = useNavigate();

    const resetError = () => {
        // @ts-ignore
        dispatch(resetStatus());
    }

    useEffect(() => {
        resetError();
    }, [])

    const [emailValue, setEmailValue] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(true);
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [isPasswordEmpty, setPasswordEmpty] = useState<boolean>(false);

    const emailInputRef = useRef(null);

    const emailRegExp = /.+@.+\.[A-Za-z]+$/;

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
        if (emailRegExp.test(e.target.value)) {
            setEmailValid(true);
        }
        setEmailValue(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>):void => {
        if (e.target.value.length !== 0) {
            setPasswordEmpty(false);
        }
        setPasswordValue(e.target.value);
    };

    interface IFormFields {
        email: boolean,
        password: boolean
    }

    const validateForm = useCallback((): boolean => {
        const validFields: IFormFields = {
            email: false,
            password: false
        }

        if (!emailRegExp.test(emailValue)) {
            setEmailValid(false);
        }
        else {
            validFields.email = true;
        }

        if (passwordValue.length < 6) {
            if (passwordValue.length === 0) {
                setPasswordEmpty(true);
            }
        }
        else {
            validFields.password = true;
        }

        if (validFields.email && validFields.password) {
            return true;
        }
        else {
            return false;
        }
    }, [emailValue, passwordValue]);


    const redirectOnSuccess = () => {
        navigate("/");
    }

    const onLoginClick = useCallback((e: FormEvent<HTMLFormElement>): void => {
        console.log("AAA, onLoginClick")
        e.preventDefault();
        const isFormCorrect = validateForm();
        if(!isFormCorrect) {
            return;
        }
        else {
            if (!userRequest) {
                // @ts-ignore
                dispatch(login({
                    email: emailValue,
                    password: passwordValue
                }, redirectOnSuccess));
            }
        }
    }, [emailValue, passwordValue, userRequest]);

    const onRegisterClick = () => {
        navigate(REGISTER);
    }

    const onForgotPasswordClick = () => {
        navigate(FORGOT_PASSWORD);
    }

    return(
        <>
            {
                userRequest &&
                !userFailed && (
                    <Loader />
                )}
            <div className='fullscreen_message'>
                {
                    userFailed &&
                    !userRequest &&
                    !userSuccess && (
                        <div className='flex_column mb-30'>
                            <h2 className='mb-10 text text_type_main-large text_color_inactive'>
                                Ошибка авторизации
                            </h2>
                            <Button
                                type="primary"
                                size="medium"
                                onClick={resetError}
                                htmlType="button">
                                Попробовать снова
                            </Button>
                        </div>
                    )}
                {
                    !userFailed && (
                        <form onSubmit={onLoginClick} className={formStyles.form_container}
                            title='Вход'
                            action='Войти'

                        >
                            <Input
                                type={'email'}
                                placeholder={'E-mail'}
                                onChange={onEmailChange}
                                value={emailValue}
                                name={'email'}
                                error={!isEmailValid}
                                ref={emailInputRef}
                                errorText={'Неправильно введен e-mail'}
                                size={'default'}
                            />
                            <div className={isPasswordEmpty ? 'password_error' : ''}>
                                <PasswordInput
                                    onChange={onPasswordChange}
                                    value={passwordValue}
                                    name={'password'}
                                />
                            </div>

                            <div >
                                <p className="text text_type_main-default text_color_inactive">
                                    <Button
                                        htmlType='submit'
                                        type='primary'
                                        size='large'>
                                        Войти
                                    </Button>
                                </p>
                            </div>
                        </form>
                    )}
                <div className='bottom_navigation'>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Button
                        type="secondary"
                        size="medium"
                        onClick={onRegisterClick}
                        htmlType="button">
                        Зарегистрироваться
                    </Button>
                </div>
                <div className='bottom_navigation mt-4'>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Button
                        type="secondary"
                        size="medium"
                        onClick={onForgotPasswordClick}
                        htmlType="button"
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
