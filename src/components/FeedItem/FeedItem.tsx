import React, {useState, useEffect, useMemo} from 'react'
import { useMatch } from 'react-router-dom';
import getOrderByNumber from '../../utils/getOrderByNumber';
import { OrdersItemProps } from '../OrderItem/OrdersItem';
import styles from './FeedItem.module.css'
import { storeType, ingridientType } from '../../utils/types';
import sum from '../../utils/sum';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/uslessMove';

export type FeedItemProps = {
    modal?: boolean
}

export default function FeedItem({modal} : FeedItemProps){
    //const number = useRouteMatch<{number: string}>()
    const number = useMatch('');
    const [order, setOrder] = useState<OrdersItemProps>()
    const ws = useAppSelector(store => store.ws.messages)
    if(modal && ws){
        setOrder(ws[0].orders.filter(item => item.number === Number(number))[0])
    }
    useEffect(() => {
        if(!modal){
            getOrderByNumber(number!.params.number)
            .then(data => {setOrder(data.orders[0])})
            .catch(e => console.log(e))
        }
    }, [])

    const ingredientsStore = useAppSelector((store) => store.ingridients)

    let activeingredient = useMemo(() => {
        const arr: Array<ingridientType & {count: number}> = []
        order && sum(order.ingredients).map(item => {
            const answ = {
                ...ingredientsStore.burgerIngridients.filter(itemInner => itemInner._id === item[0])[0],
                count: item[1]
            }
            arr.push(answ)
        })
        return arr
    }, [order])

    return(
        <div className={styles.container}>
            <p className={`text text_type_digits-medium ${styles.align} mb-10`}>#{order?.number}</p>
            <p className="text text_type_main-medium mb-3">{order?.name}</p>
            <p className="text text_type_main-default mb-15">{order?.status}</p>
            <p className="text text_type_main-medium mb-6">Состав</p>
            <div className={styles.orders}>
                {
                    activeingredient.map(item => (
                        <div key={item._id} className={styles.row + ' mb-6'}>
                            <div>
                                <img src={item.image_mobile} className={`mr-4 ${styles.img}`} />
                                <p className="text text_type_main-small">{item.name}</p>
                            </div>
                            <div>
                                <p className="text text_type_digits-default mr-2">{item.count}x{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.row}>
            <p className="text text_type_main-default text_color_inactive">{order && new Date(order.createdAt).toUTCString()}</p>
            <div>
                <p className="text text_type_digits-default mr-2">
                    {
                        activeingredient.reduce((acc, item) => acc += item.price, 0)
                    }
                </p><CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}