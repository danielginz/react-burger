import React, {useEffect, useRef} from 'react'
import styles from './Feed.module.css'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../service/actions/constant';
import OrdersItem from '../../components/OrderItem/OrdersItem';
import { useAppDispatch, useAppSelector } from '../../utils/uslessMove';

export default function Feed(){
    const dispatch = useAppDispatch()
    const ws = useAppSelector((store) => store.ws)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})

        return () => {dispatch({type: WS_CONNECTION_CLOSED})}
    }, [dispatch])
    if(!ws.get){
        return <div/>
    }
    
    return(
        <div className={styles.container}>
            <p className="text text_type_main-large mb-5">
            Лента заказов
            </p>
            <div className={styles.row}>
                {ws.messages && ws.messages.length > 0 && ws.messages[0].orders.length > 0 && 
                <div className={`mr-15 ${styles.scroll}`} style={{maxHeight: ref.current?.offsetHeight}}>
                    {
                      ws.messages[ws.messages.length - 1].orders.map(item => <OrdersItem key={''+item._id} {...item}/>)
                    }
                </div>}
                <div ref={ref}>
                    <div className={styles.row + ' mb-15'}>
                        <div className='mr-9'>
                            <p className="text text_type_main-medium mb-4">
                                Готовы:
                            </p>
                            {
                                ws.messages[ws.messages.length - 1].orders.filter(item => item.status === 'done').map(done => (
                                    <p className="text text_type_digits-medium text_color_success mt-2" key={done._id + "3"}>{''+done.number}</p>
                                ))
                            }
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-4">
                                В работе:
                            </p>
                            {
                                ws.messages[ws.messages.length - 1].orders.filter(item => item.status !== 'done').map(done => (
                                    <p className="text text_type_digits-medium text_color_success mt-2" key={done._id + "2"}>{''+done.number}</p>
                                ))
                            }
                        </div>
                    </div>
                    <p className="text text_type_main-medium mb-4">
                        Выполнено за все время:
                    </p>
                    <p className={`text text_type_digits-large mb-15 ${styles.glow}`}>{''+ws.messages[ws.messages.length - 1].total}</p>
                    <p className="text text_type_main-medium mb-4">
                        Выполнено за сегодня:
                    </p>
                    <p className={`text text_type_digits-large ${styles.glow}`}>{''+ws.messages[ws.messages.length - 1].totalToday}</p>
                </div>
            </div>
        </div>
    )
}