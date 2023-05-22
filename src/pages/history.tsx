import {FC, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import styles from './history.module.css';

import Sidebar from '../components/sidebar/sidebar';
import OrdersList from '../components/orders-list/orders-list';
import Loader from '../components/loader/loader';

import { feedSlice } from '../services/slices/feed';
import { getUser, userSlice, startHistory, stopHistory } from '../services/slices/user';

export const HistoryPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
    state => state.items
  );
  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useAppSelector(
    state => state.user
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
    resetStatus
  } = userSlice.actions;

  const {
    wsConnected,
    wsError
  } = useAppSelector(
      state => state.ws
  );

  useEffect(() => {
    dispatch(resetStatus());

    dispatch(startHistory());

    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
    return () => {
      dispatch(stopHistory());
    };
  }, []);

  useEffect(() => {
    if (wsConnected)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
  }, [wsConnected, wsError]);

  return(
    <>
        {
          (itemsRequest || userRequest || feedRequest) && 
          (!itemsFailed || !userFailed || !feedFailed) && 
          (!itemsSuccess || !userSuccess || !feedSuccess) && (
            <Loader />
        )}
        <div className={styles.history_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.history_orders_container}>
          {
            (itemsFailed || userFailed || feedFailed) && 
            (!itemsRequest || !userRequest || !feedRequest) && 
            (!itemsSuccess || !userSuccess || !feedSuccess) && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            (itemsSuccess && userSuccess && feedSuccess) &&
            (!itemsFailed || !userFailed || !feedFailed) && 
            (!itemsRequest || !userRequest || !feedRequest) && (
              <OrdersList 
                source='history'
                orders={orders}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
