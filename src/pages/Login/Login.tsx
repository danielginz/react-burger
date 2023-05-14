import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {FormEvent, useCallback, useState } from 'react'
import { FORGOT_URL, REGISTRATION_URL } from '../../utils/urls'
import style from '../../styles/oneScreenForm.module.css'
import {Link, useNavigate} from 'react-router-dom'
import signIn from '../../service/actions/signIn'
import { useAppDispatch } from '../../utils/uslessMove';

export default function Login(){
    const [value, setValue] = useState({email: '', pass: ''})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const login = useCallback((e: FormEvent) => {
        e.preventDefault()
        dispatch(signIn(value, navigate))
    }, [dispatch, navigate, value])

    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={login}> 
                <p className='pb-6 text text_type_main-medium'>Вход</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='email' 
                        placeholder='Email' 
                        size='default' 
                        value={value.email} 
                        onChange={(e) => setValue({...value, email: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        icon={'ShowIcon'}
                        placeholder='Пароль' 
                        value={value.pass}
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}
                {/*@ts-expect-error*/}
                <Button type="primary" size="medium">Войти</Button>
                <p className='text text_type_main-default mt-20'>Вы — новый пользователь? <Link to={{pathname: REGISTRATION_URL}}>Зарегистрироваться</Link></p>
                <p className='text text_type_main-default mt-4'>Забыли пароль? <Link to={{pathname: FORGOT_URL}}>Восстановить пароль</Link></p>
            </form>
        </div>
    )
}