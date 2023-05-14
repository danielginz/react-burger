import React, { useEffect, useState } from 'react'
import orderStyle from './OrderDetails.module.css'
import doneGif from '../../images/done.gif'
import donePng from '../../images/done.png'
import PropTypes from 'prop-types'

export type OrderDetailsProps = {
    order: number | string;
}

export default function OrderDetails(props : OrderDetailsProps){

    const [done, setDone] = useState(doneGif)

    useEffect(() => {
        setTimeout(() => setDone(donePng), 900)
    }, [])

    return(
        <div className={orderStyle.container}>
            <div className={`${orderStyle.order} text text_type_digits-large`}>{props.order}</div>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={done} alt="done" className={orderStyle.gif}/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`${orderStyle.subtext} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    order: PropTypes.string.isRequired
}