import { FC, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import Modal from '../components/modal/modal';
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
import { feedSlice } from '../services/slices/feed';
import { itemsSlice } from '../services/slices/items';
import { IOrder } from '../services/types';

export const OrderModalPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
    state => state.items
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useAppSelector(
    state => state.feed
  );

  const {
    wsConnected,
    wsError
  } = useAppSelector(
    state => state.ws
  );

  const { request } = itemsSlice.actions;
  const location = useLocation();

  useEffect(() => {
    if (wsConnected)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else 
      dispatch(feedSlice.actions.request());
  }, [wsConnected, wsError]);

  const currentOrderId: string | undefined = useParams<{ id: string }>().id;
  const currentOrder: IOrder = orders.find(order => order._id === currentOrderId) || {};

  const replaceState = useCallback(() => {
    dispatch(request())
    location.state({ background: undefined });
  }, [dispatch, request]);


  const closeModal = (): void => {
    navigate(location.state.background.pathname);
  }

  // handle state cleaning in case of page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, []);

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
          <Modal
            header={`#${currentOrder.number?.toString().padStart(6, '0')}`}
            isOrderModal={true}
            closeModal={closeModal} >
            <OrderDetailedView
              order={currentOrder}
              isOrderModal={true}
            />
          </Modal> 
        )}
    </>
  );
}

export default OrderModalPage;
