import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import { ingridientType } from '../../utils/types';
import styles from './OrderItems.module.css'
import { useMemo } from 'react';
import sum from '../../utils/sum';
import { useLocation, Link } from 'react-router-dom';
import { LENTA_URL } from '../../utils/urls';
import { useAppSelector } from '../../utils/uslessMove';

export type OrdersItemProps = {
    _id: number | string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    ingredients: string[];
}

export default function OrdersItem ({status, createdAt, name, number, ingredients} : OrdersItemProps){
    const ingredientsStore = useAppSelector((store) => store.ingridients)

    let activeingredient = useMemo(() => {
        const arr: Array<ingridientType & {count: number}> = [] 
        sum(ingredients).map(item => {
            const answ = {
                ...ingredientsStore.burgerIngridients.filter(itemInner => itemInner._id === item[0])[0],
                count: item[1]
            }
            arr.push(answ)
        })
        return arr
    }, [ingredients])

    const location = useLocation()

    return(
        <Link className={styles.container} to={LENTA_URL+`/${number}`} state={{orderBg: location}}>
            <div className={styles.row + ' mb-6'}>
                <p className='text text_type_digits-default'>#{''+number}</p>
                <p className='text text_type_main-default text_color_inactive'>{new Date(`${createdAt}`).toUTCString()}</p>
            </div>
            <p className="text text_type_main-medium mb-2">
                {name}
            </p>
            <p className="text text_type_main-small mb-6">
                {status}
            </p>
            <div className={styles.row}>
                <div className={styles.imgContainer}>
                {
                    activeingredient.map((item, index) => {
                        if( item.count && item.count > 1){
                            return (
                            <div key={index} className={styles.withNumber}>
                                 <img 
                                    src={item.image_mobile} 
                                    className={styles.img}
                                />
                                <span className='text text_type_main-small'>+{item.count && item.count}</span>
                            </div>)
                        } else {
                            return (
                                <img 
                                    key={index}
                                    src={item.image_mobile} 
                                    className={styles.img}
                                />
                            )
                        }
                        }
                    )
                }
                </div>
                <div className={styles.innerContainer}>
                <p className="text text_type_digits-default mr-2">
                    {
                        activeingredient.reduce((acc, item) => item.price ? acc += item.price : acc, 0) 
                    }    
                </p><CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}