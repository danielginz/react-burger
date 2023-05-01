import ordersListStyles from './orders-list.module.css';
import OrdersCard from '../orders-card/orders-card';
import {IOrder} from "../../services/types";
import {FC} from "react";

interface IOrdersListProps {
    orders: Array<IOrder>,
    source: string
}

const OrdersList: FC<IOrdersListProps> = (props) => {
    //console.log("AAA, orders-list, props: "+JSON.stringify(props))

    return (
    <>
      {(props.orders.length > 0 ?
        <ul className={ordersListStyles.orders_list}>
          {props.orders.map((order) => (
            <OrdersCard
              // @ts-ignore
              //key={order._id}
              source={props.source}
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
