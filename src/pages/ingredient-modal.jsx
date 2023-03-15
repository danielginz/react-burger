import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams } from 'react-router-dom';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
import { itemsSlice } from '../services/slices/items';

export const IngredientModalPage = () => {
  console.log("AAA, IngredientModalPage");
  const dispatch = useDispatch();
  
  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );

  const { request } = itemsSlice.actions;

  const currentItemId = useParams().id;
  const currentItem = items.find((item) => item._id === currentItemId);

  const replaceState = useCallback(() => {
    dispatch(request())
    window.location.state({ background: undefined });
  }, [dispatch, request]);

  // return to HomePage if modal is closed
  const closeModal = () => {
    window.location.replace('/');

  }

  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, [replaceState]);
  
  return (
    <>
      {
        itemsRequest && 
        !itemsFailed && 
        !itemsSuccess && (
          <Loader />
      )}
      {
        itemsFailed && 
        !itemsRequest && 
        !itemsSuccess && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        itemsSuccess && 
        !itemsFailed && 
        !itemsRequest && (
          <Modal 
            header='Детали ингредиента'
            closeModal={closeModal} >
              <IngredientDetails item={currentItem} />
          </Modal> 
      )}
  </>
  );
}

export default IngredientModalPage;
