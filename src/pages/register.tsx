import { FC, useState, useRef, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';

import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { register, userSlice } from '../services/slices/user';

import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import {LOGIN} from "../utils/routes-constants";
import formStyles from "../components/form/form.module.css";

export const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    userRequest,
    userSuccess,
    userFailed
  } = useAppSelector(
      state => state.user
  );
  const { resetStatus } = userSlice.actions;

  const navigate = useNavigate();

  const resetError = (): void => {
    dispatch(resetStatus());
  }

  useEffect(() => {
    resetError();
  }, [])

  const [nameValue, setNameValue] = useState<string>('');
  const [isNameEmpty, setNameEmpty] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordEmpty, setPasswordEmpty] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const emailRegExp: RegExp = /.+@.+\.[A-Za-z]+$/;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.value.length > 0) {
      setNameEmpty(false);
    }
    setNameValue(e.target.value);
  };

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
    password: boolean,
    name: boolean
  }

  const validateForm = useCallback(() => {
    const validFields: IFormFields = {
      email: false,
      password: false,
      name: false
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

    if (nameValue.length === 0) {
      setNameEmpty(true);
    }
    else {
      validFields.name = true;
    }

    if (validFields.email && validFields.password && validFields.name) {
      return true;
    }
    else {
      return false;
    }
  }, [emailValue, passwordValue, nameValue]);

  const redirectOnSuccess = () => {
    navigate("/");
  }

  const onRegisterClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect: boolean = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      if (!userRequest) {
        dispatch(register({
          name: nameValue,
          email: emailValue,
          password: passwordValue
        }, redirectOnSuccess))
      }
    }
  }, [emailValue, nameValue, passwordValue, userRequest]);

  const onLoginClick = () => {
    navigate(LOGIN);
  }

  return(
      <>
        {
            (userRequest) &&
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
                      Ошибка при регистрации
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
                  <form className={formStyles.form_container}
                      title='Регистрация'
                      action='Зарегистрироваться'
                        onSubmit={onRegisterClick}
                  >
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onNameChange}
                        value={nameValue}
                        name={'name'}
                        error={isNameEmpty}
                        ref={nameInputRef}
                        errorText={'Поле не может быть пустым'}
                        size={'default'}
                    />
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
                          Зарегистрироваться
                        </Button>
                      </p>
                    </div>
                  </form>
              )}
          <div className='bottom_navigation'>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </p>
            <Button
                type="secondary"
                size="medium"
                onClick={onLoginClick}
                htmlType="button">
              Войти
            </Button>
          </div>
        </div>
      </>
  );
}

export default RegisterPage;
