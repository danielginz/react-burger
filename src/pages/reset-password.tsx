import styles from './reset-password.module.css';

import { FC, useState, useRef, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';

import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword, userSlice } from '../services/slices/user';

import { useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {LOGIN} from "../utils/routes-constants";
import formStyles from "../components/form/form.module.css";

export const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
      // @ts-ignore
      state => state.user
  );
  const { resetStatus } = userSlice.actions;

  const navigate = useNavigate();

  const resetError = (): void => {
    // @ts-ignore
    dispatch(resetStatus());
  }

  useEffect(() => {
    resetError();
  }, [])

  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordEmpty, setPasswordEmpty] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>('');
  const [isCodeEmpty, setCodeEmpty] = useState<boolean>(false);

  const codeInputRef = useRef<HTMLInputElement>(null);

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.value.length > 0) {
      setCodeEmpty(false);
    }
    setCodeValue(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  interface IFormFields {
    password: boolean
    code: boolean
  }

  const validateForm = useCallback((): boolean => {
    const validFields: IFormFields = {
      password: false,
      code: false
    }

    if (passwordValue.length < 6) {
      if (passwordValue.length === 0) {
        setPasswordEmpty(true);
      }
    }
    else {
      validFields.password = true;
    }

    if (codeValue.length === 0) {
      setCodeEmpty(true);
    }
    else {
      validFields.code = true;
    }

    if (validFields.password && validFields.code) {
      return true;
    }
    else {
      return false;
    }
  }, [codeValue, passwordValue]);

  const redirectOnSuccess = () => {
    navigate(LOGIN);
  }

  const onResetPasswordClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect: boolean = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      if (!userRequest) {
        // @ts-ignore
        dispatch(resetPassword(
            codeValue,
            passwordValue,
            redirectOnSuccess
        ));
      }
    }
  }, [codeValue, passwordValue, userRequest]);

  const onLoginClick = () => {
    navigate(LOGIN);
  }


  return(
      <>
        {
            userRequest &&
            !userFailed && (
                <Loader />
            )}
        <div
            className={styles.reset_password_container + ' fullscreen_message'}>
          {
              userFailed &&
              !userRequest &&
              !userSuccess && (
                  <div className='flex_column mb-30'>
                    <h2 className='mb-10 text text_type_main-large text_color_inactive'>
                      Ошибка восстановления пароля
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
                  <form onSubmit={onResetPasswordClick} className={formStyles.form_container}
                      title='Восстановление пароля'
                      action='Сохранить'
                  >
                    <div className={isPasswordEmpty ? 'password_error' : ''}>
                      <PasswordInput
                          onChange={onPasswordChange}
                          value={passwordValue}
                          name={'password'}
                      />
                    </div>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onCodeChange}
                        value={codeValue}
                        name={'code'}
                        error={isCodeEmpty}
                        ref={codeInputRef}
                        errorText={'Поле не может быть пустым'}
                        size={'default'}
                    />

                    <div >
                      <p className="text text_type_main-default text_color_inactive">
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='large'>
                          Сохранить
                        </Button>
                      </p>
                    </div>
                  </form>
              )}
          <div className='bottom_navigation mt-4'>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
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

export default ResetPasswordPage;
