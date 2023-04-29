import {useState, useRef, useCallback, useEffect, FC, ChangeEvent, FormEvent} from 'react';
import { useSelector, useDispatch } from "react-redux";

import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { forgotPassword, userSlice } from '../services/slices/user';

import { useNavigate } from 'react-router-dom';
import {LOGIN, RESET_PASSWORD} from "../utils/routes-constants";

export const ForgotPasswordPage: FC = () => {
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

  const emailInputRef = useRef<HTMLInputElement>(null);

  const emailRegExp: RegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };

  interface IFormFields {
    email: boolean
  }
  const validateForm = (): boolean => {
    const validFields:IFormFields = {
      email: false
    }

    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }
    else {
      validFields.email = true;
    }

    if (validFields.email) {
      return true;
    }
    else {
      return false;
    }
  }

  const redirectOnSuccess = (): void => {
    navigate(RESET_PASSWORD);
  }

  const onResetPasswordClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      if (!userRequest) {
        // @ts-ignore
        dispatch(forgotPassword(emailValue, redirectOnSuccess));
      }
    }
  }, [emailValue, userRequest, dispatch]);//was added

  const onLoginClick = (): void => {
    navigate(LOGIN);
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
          <Form
            title='Восстановление пароля'
            actionName='Восстановить'
            onFormSubmit={onResetPasswordClick}
          >
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              error={!isEmailValid}
              ref={emailInputRef}
              errorText={'Неправильно введен e-mail'}
              size={'default'}
            />
          </Form>
        )}
        <div className='bottom_navigation mt-4'>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={onLoginClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}
export default ForgotPasswordPage;
