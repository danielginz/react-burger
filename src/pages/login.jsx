import { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { login, userSlice } from '../services/slices/user';

import { useLocation, useNavigate } from 'react-router-dom';
import {FORGOT_PASSWORD, REGISTER} from "../utils/routes-constants";

export const LoginPage = () => {
  const dispatch = useDispatch();

 const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    state => state.user
  );
  const { resetStatus } = userSlice.actions;

  const location = useLocation();
  const navigate = useNavigate();

    const resetError = () => {
    dispatch(resetStatus());
  }  

  useEffect(() => {
    resetError();
  }, [])

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = e => {
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = e => {
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  const validateForm = useCallback(() => {
    const validFields = {
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
    //const { from } = location.state || { from: "/" };
    navigate("/");
  }

  const onLoginClick = useCallback((e) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      if (!userRequest) {
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
              >
                Попробовать снова
              </Button>
            </div>
        )}
        {
          !userFailed && (
          <Form
            title='Вход'
            actionName='Войти'
            onClick={onLoginClick}
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
          </Form>
        )}
        <div className='bottom_navigation'>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Button
            type="secondary"
            size="medium"
            onClick={onRegisterClick}
          >
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
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
