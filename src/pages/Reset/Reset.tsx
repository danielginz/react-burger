import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useState } from 'react'
import { LOGIN_URL } from '../../utils/urls'
import style from '../../styles/oneScreenForm.module.css'
import { Link } from 'react-router-dom'
import resetPass from '../../service/actions/resetPass'
import { useAppDispatch, useAppSelector } from '../../utils/uslessMove';

export default function Reset(){
    const [value, setValue] = useState({code: '', pass: ''})
    const refresh = useAppSelector((store) => store.refresh)
    const dispatch = useAppDispatch()
    const reset = useCallback((e: {preventDefault: () => void}) => {
        e.preventDefault()
        dispatch(resetPass(value))},[value, dispatch])
    return(
        <div className={style.container}> 
            <form className={style.card} onSubmit={reset}> 
                <p className='pb-6 text text_type_main-medium'>{refresh.passResetSuccess ? 'Успех!' : 'Восстановить'}</p>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        icon={'ShowIcon'}
                        placeholder='Введите новый пароль' 
                        value={value.pass}
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Введите код из письма' 
                        size='default' 
                        value={value.code} 
                        onChange={(e) => setValue({...value, code: e.target.value})}
                    />
                </div>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}
                {/*@ts-expect-error*/}
                <Button onClick={reset} type="primary" size="medium" disabled={refresh.passResetRequest}>{refresh.passResetRequest ? 'Запрос...' : 'Сохранить'}</Button>
                <p className='text text_type_main-default mt-20'>Вспомнили пароль? <Link to={{pathname: LOGIN_URL}}>Войти</Link></p>
            </form>
        </div>
    )
}