import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted.gif'

function OrderDetails({ orderData }) {
    return(
        <div className={orderDetailsStyles.order_details_container + ' mt-20 mb-15'}>
            {orderData.success ? (
                <>
                    <p className={orderDetailsStyles.order_id + ' text text_type_digits-large'}>
                        {orderData.id}
                    </p>
                    <p className='text text_type_main-medium mt-8 mb-15'>
                        идентификатор заказа
                    </p>
                    <img
                        src={orderAcceptedImage + '?v=' + Math.floor(Math.random()*100)}
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
                </>
            ) : (
                <>
                    <p className='text text_type_main-large'>
                        Произошла ошибка
                    </p>
                    <p className='text text_type_main-default text_color_inactive mt-8 mb-15'>
                        Пожалуйста, попробуйте оформить заказ позже
                    </p>
                </>
            )}
        </div>
    );
}

OrderDetails.propTypes = {
    orderData: PropTypes.shape({
        success: PropTypes.bool.isRequired,
        id: PropTypes.number
    }).isRequired
};

export default OrderDetails;