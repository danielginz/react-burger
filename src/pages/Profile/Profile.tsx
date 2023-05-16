import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import refreshUser from "../../service/actions/refreshUser";
import style from './Profile.module.css'
import ProfileContainer from "./ProfileContainer";
import { useAppSelector, useAppDispatch } from '../../utils/uslessMove';

export default function Profile(){
    const user = useAppSelector((store) => store.user)
    const disaptch = useAppDispatch()
    const [value, setValue] = useState({name: user.name || '', login: user.email || '', pass: user.pass || ''})
    return(
        <ProfileContainer>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Имя' 
                        size='default' 
                        icon="EditIcon"
                        value={value.name} 
                        onChange={(e) => setValue({...value, name: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='text' 
                        placeholder='Логин' 
                        size='default' 
                        icon="EditIcon"
                        value={value.login} 
                        onChange={(e) => setValue({...value, login: e.target.value})}
                    />
                </div>
                <div className={`pb-6 ${style.input}`}>
                    <Input 
                        type='password' 
                        placeholder='Пароль' 
                        size='default' 
                        icon="EditIcon"
                        value={value.pass} 
                        onChange={(e) => setValue({...value, pass: e.target.value})}
                    />
                </div>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}
                <Button type="primary" htmlType="submit" onClick={() => disaptch(refreshUser(value))} size="medium">Сохранить</Button>
        </ProfileContainer>
    )
}