
import { useAppSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
import {FC} from "react";

export const IngredientPage: FC = () => {
  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
      state => state.items
  );

  const currentIngredientId:string | undefined = useParams<{ id: string }>().id;

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
        <div className='fullscreen_message'>
          <p className="text text_type_main-large">
            Детали ингредиента
          </p>
          <IngredientDetails
            item={items.find((item: { _id: string | undefined; }) => item._id === currentIngredientId) || {}}
          />
        </div>
      )}
  </>
  );
}

export default IngredientPage;
