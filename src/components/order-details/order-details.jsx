import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted.gif'


const ORDER_ID = '034536';
function OrderDetails() {
    return(
        <div className={orderDetailsStyles.order_details_container + ' mt-20 mb-15'}>
            <p className={orderDetailsStyles.order_id + ' text text_type_digits-large'}>
                {ORDER_ID}
            </p>
            <p className='text text_type_main-medium mt-8 mb-15'>
                идентификатор заказа
            </p>
            <img src={orderAcceptedImage + '?v=' + Math.floor(Math.random()*100)}
                 alt="Заказ принят"
                 title="Заказ принят"
                 height="120"
            />
            <p className='text text_type_main-default mt-15 mb-2'>
                Ваш заказ начали готовить
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

export default OrderDetails;
