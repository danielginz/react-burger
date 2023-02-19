import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted.gif'

const ORDER_ID = '034536';
function OrderDetails(props) {
    console.log("AAA, order-details, props: "+JSON.stringify(this.props));
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

OrderDetails.propTypes = {
    item: PropTypes.shape({
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired
};



export default OrderDetails;
