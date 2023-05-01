import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {useLocation, useParams} from 'react-router-dom';

import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';

import { getFeed } from '../services/slices/feed';
import {FC} from "react";
import {IOrder} from "../services/types";

export const OrderPage: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
     // @ts-ignore
    state => state.items
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useSelector(
    // @ts-ignore
    state => state.feed
  );

  const [currentOrder, setCurrentOrder] = useState<IOrder>({});

  useEffect(() => {
    if (!feedSuccess) {
      // @ts-ignore
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

  const currentOrderId:string | undefined = useParams<{ id: string }>().id;

  return(
    <>
      {
        (itemsRequest || feedRequest) &&
        (!itemsFailed || !feedFailed) &&
        (!itemsSuccess || !feedSuccess) && (
          <Loader />
      )}
      {
        (itemsFailed || feedFailed) &&
        (!itemsRequest || !feedRequest) &&
        (!itemsSuccess || !feedSuccess) && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        (itemsSuccess && feedSuccess) &&
        (!itemsFailed || !feedFailed) &&
        (!itemsRequest || !feedRequest) && (
          <div className='fullscreen_message'>
            <OrderDetailedView
              order={orders.find((order: { id: string | undefined; }) => order.id === currentOrderId)}
            />
          </div>
        )}
    </>
  );
}

export default OrderPage;
