import React, { FC, useState, useRef, useEffect, ChangeEvent, FocusEvent } from 'react';
import styles from './profile.module.css';

import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import Loader from '../components/loader/loader';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { getUser, setUser, userSlice } from '../services/slices/user';
import {useDispatch, useSelector} from "react-redux";

export const ProfilePage: FC = () => {
  const dispatch = useDispatch();


  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
      // @ts-ignore
      state => state.user
  );

  const {
    resetStatus
  } = userSlice.actions

  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const resetError = (): void => {
    // @ts-ignore
    dispatch(resetStatus());
  }

  useEffect(() => {
    resetError();

    if (!userSuccess && !userRequest) {
      // @ts-ignore
      dispatch(getUser());
    }
  }, [])

  useEffect(() => {
    setNameValue(user.name || '');
    setEmailValue(user.email || '');
    setPasswordValue(user.password || '');
  }, [user]);

  const [isNameInputDisabled, setNameInputDisabled] = useState<boolean>(true)
  const [isNameInputEmpty, setNameInputEmpty] = useState<boolean>(false)
  const [isPasswordInputDisabled, setPasswordInputDisabled] = useState<boolean>(true)
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState<boolean>(false)

  const [hasFormChanged, setFormChanged] = useState<boolean>(false)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.value.length > 0) {
      setNameInputEmpty(false);
    }
    setNameValue(e.target.value);
    setFormChanged(true);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>):void => {
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    setPasswordValue(e.target.value);
    setFormChanged(true);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setEmailValue(e.target.value);
    setFormChanged(true);
  };

  const onNameIconClick = (): void => {
    nameInputRef.current?.focus();
    setNameInputDisabled(false);
  }

  const onPasswordIconClick = (): void => {
    passwordInputRef.current?.focus();
    setPasswordInputDisabled(false);
  }

  const onNameInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 0) {
      setNameInputEmpty(true);
    }
    setNameInputDisabled(true);
  }

  const onPasswordInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 0) {
      setPasswordInputEmpty(true);
    }
    setPasswordInputDisabled(true);
  }

  const onSubmitChanges = (): void => {
    if (!userRequest) {
      // @ts-ignore
      dispatch(setUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }));
    }
    setFormChanged(false);
  }

  const onCancelChanges = (): void => {
    setNameValue(user.name || '');
    setEmailValue(user.email || '');
    setPasswordValue(user.password || '');
    setFormChanged(false);
  }

  console.log("AAA, profile, userRequest: "+userRequest+", userFailed: "+userFailed+", userSuccess: "+userSuccess);
  return(
      <>
        {
            userRequest &&
            !userFailed &&
            !userSuccess && (
                <Loader />
            )}
        <div className={styles.profile_container + ' mt-30'}>
          <Sidebar />
          <div className={styles.form_container}>
            {
                userFailed &&
                !userRequest &&
                !userSuccess && (
                    <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                      Ошибка загрузки
                    </h2>
                )}
            {
                userSuccess &&
                !userFailed &&
                !userRequest && (

                    // @ts-ignore
                    <Form>
                      <Input
                          type={'text'}
                          placeholder={'Имя'}
                          onChange={onNameChange}
                          value={nameValue}
                          name={'name'}
                          error={isNameInputEmpty}
                          ref={nameInputRef}
                          errorText={'Поле не может быть пустым'}
                          size={'default'}
                          icon={'EditIcon'}
                          onIconClick={onNameIconClick}
                          disabled={isNameInputDisabled}
                          onBlur={onNameInputBlur}
                      />
                      <EmailInput
                          onChange={onEmailChange}
                          value={emailValue}
                          name={'email'}
                          size={'default'}
                      />
                      <Input
                          type={'password'}
                          placeholder={'Пароль'}
                          onChange={onPasswordChange}
                          value={passwordValue}
                          name={'password'}
                          error={isPasswordInputEmpty}
                          ref={passwordInputRef}
                          errorText={'Поле не может быть пустым'}
                          size={'default'}
                          icon={'EditIcon'}
                          onIconClick={onPasswordIconClick}
                          disabled={isPasswordInputDisabled}
                          onBlur={onPasswordInputBlur}
                      />
                      {hasFormChanged &&
                          <div className={styles.buttons_container}>
                            <Button
                                type="secondary"
                                size="medium"
                                onClick={onCancelChanges}
                                htmlType="button">
                              Отменить
                            </Button>
                            <Button
                                type="primary"
                                size="medium"
                                onClick={onSubmitChanges}
                                htmlType="button"
                            >
                              Сохранить
                            </Button>
                          </div>
                      }
                    </Form>

                )}
          </div>
        </div>
      </>
  );
}

export default ProfilePage;
