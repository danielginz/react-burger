import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useCallback, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import setUser from '../../service/actions/setUser'
import style from '../../styles/oneScreenForm.module.css'
import { LOGIN_URL } from '../../utils/urls'
import { useAppDispatch } from '../../utils/uslessMove';

export default function Registration(){
    const [value, setValue] = useState({email: '', pass: '', name: ''});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onRegistrationPress = useCallback((e: {preventDefault: () => void}) => {
        e.preventDefault()
        dispatch(setUser(value, () => navigate(LOGIN_URL)))}, [value, dispatch, navigate])
    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={onRegistrationPress}> 
                <p className='pb-6 text text_type_main-medium'>Регистрация</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Имя' 
                        size='default' 
                        value={value.name} 
                        onChange={(e) => setValue({...value, name: e.target.value})}
                    />
                </div>
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
                <Button type="primary" size="medium" htmlType="button">Зарегистрироваться</Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </form>
        </div>
    )
}