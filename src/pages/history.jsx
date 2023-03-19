import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './history.module.css';

import Sidebar from '../components/sidebar/sidebar';
import OrdersList from '../components/orders-list/orders-list';
import Loader from '../components/loader/loader';

import { getFeed } from '../services/slices/feed';

export const HistoryPage = () => {
  const dispatch = useDispatch();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );
  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    state => state.user
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useSelector(
    state => state.feed
  );

  const userOrders = orders.filter((order) => (
    user.orders.includes(order.id)
  ));

  // we need to have feed from API in store to render orders data
  useEffect(() => {
    // won't call API if items are already in store
    if (!feedSuccess) {
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

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
                orders={userOrders}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;