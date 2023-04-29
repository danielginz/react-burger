import PropTypes from 'prop-types';
import ordersListStyles from './orders-list.module.css';
import OrdersCard from '../orders-card/orders-card';
import {IOrder} from "../../services/types";
import {FC} from "react";

interface IOrdersListProps {
    orders: Array<IOrder>,
    source: string
}

const OrdersList: FC<IOrdersListProps> = ({ orders, source }) => {
  // @ts-ignore
    return (
    <>  
      {(orders.length > 0 ?
        <ul className={ordersListStyles.orders_list}>
          {orders.map((order) => (
            <OrdersCard
              key={order._id}
              source={source}
              order={order}
            />
          ))}
        </ul>
      : <h3 className='text text_type_main-large text_color_inactive pb-6 ml-30'>
          Заказов нет
        </h3>)}
    </>
  );
};

export default OrdersList;
