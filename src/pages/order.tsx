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
  //const isFeedPage: boolean = location.pathname.split('/')[1] === 'feed';

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

  /*const {
    wsConnected,
    wsError
  } = useAppSelector(
      state => state.ws
  );*/

  const [currentOrder, setCurrentOrder] = useState<IOrder>({});





  useEffect(() => {
    if (!feedSuccess) {
      // @ts-ignore
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);
  /*useEffect(() => {
    // open new websocket when the page is opened
    if(isFeedPage)
      dispatch(startFeed());
    else
      dispatch(startHistory());
    return () => {
      // close the websocket when the page is closed
      if(isFeedPage)
        dispatch(stopFeed());
      else
        dispatch(stopHistory());
    };
  }, []);*/



  //const currentOrderId = useParams().id;
  const currentOrderId:string | undefined = useParams<{ id: string }>().id;


  /*useEffect(() => {
    if (!!orders && orders.length > 0 && wsConnected) {
      setCurrentOrder(orders.find(order => order._id === currentOrderId) || {})
      dispatch(feedSlice.actions.success());
    }
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else
      dispatch(feedSlice.actions.request());
  }, [wsConnected, orders, wsError]);*/

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
