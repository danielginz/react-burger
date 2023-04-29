import {useEffect, useCallback, FC} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
import { itemsSlice } from '../services/slices/items';
import {IIngredient} from "../services/types";

//export const IngredientModalPage = () => {
export const IngredientModalPage: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //let { state } = useLocation();
  const location = useLocation();

  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
     // @ts-ignore
    state => state.items
  );

  const { request } = itemsSlice.actions;

  const currentItemId: string | undefined = useParams<{ id: string }>().id;
  const currentItem: IIngredient = items.find((item: { _id: string | undefined; }) => item._id === currentItemId) || {};

  const replaceState = useCallback(() => {
    dispatch(request())
    location.state({ background: undefined });
  }, [dispatch, request]);

  // return to HomePage if modal is closed
  const closeModal = () => {
    navigate("/");
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
