import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent, useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import refresh from "../../service/actions/refresh";
import style from '../../styles/oneScreenForm.module.css'
import { LOGIN_URL } from "../../utils/urls";
import { useAppSelector, useAppDispatch } from '../../utils/uslessMove';

export default function Forgot(){
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const refreshState = useAppSelector((store) => store.refresh )
    const dispatch = useAppDispatch()
    const reset = useCallback((e: FormEvent) => {
        e.preventDefault()
        dispatch(refresh(email, navigate))}, [dispatch, navigate, email])
        
    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={reset}> 
                <p className='pb-6 text text_type_main-medium'>Восстановление пароля</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='email' 
                        placeholder='Укажите e-mail' 
                        size='default' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}
                {/*@ts-expect-error*/}
                <Button 
                    type="primary" 
                    disabled={refreshState.request || refreshState.error}
                     size="medium" 
                >{refreshState.request ? 'Запрос...' : refreshState.error ? 'email не найден' : 'Востановить'}</Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </form>
        </div>
    )
}