import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

import {ingredientSimplifiedType3} from "../../utils/prop-types";
import {ingredientSlice} from "../../services/slices/ingredient";
import {Link, useLocation, useNavigate} from "react-router-dom";

const BurgerIngredientsCard = memo((props) => {
    const dispatch = useDispatch();
    const { openIngredientModal } = ingredientSlice.actions;
    const { increaseQuantityValue } = itemsSlice.actions;
    const { addMiddleItem } = burgerConstructorSlice.actions

    /*const navigate = useNavigate();
    let location = useLocation();*/


    let { state } = useLocation();
    console.log("HHH, state: "+JSON.stringify(state));


    const handleIngredientClick = () => {
        dispatch(openIngredientModal(props.item));
        //navigate(`/ingredients/${props.item._id}`);
        console.log("AAA, path: "+`localhost:3000/ingredients/${props.item._id}`)
        console.log("AAA, props.item");
    }

    const [{opacity}, dragRef] = useDrag({
        type: props.item.type,
        item: props.item,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        }),
        end(item, monitor) {
            if(monitor.didDrop() && item.type !== 'bun') {
                dispatch(addMiddleItem(item));
                dispatch(increaseQuantityValue(item._id));
            }
        }
      });

    return(
        /*<Link
            key={props.item._id}
            to={{
                // Тут мы формируем динамический путь для нашего ингредиента
                // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
                pathname: `/ingredients/${props.item._id}`,
                //pathname: '/',`
                state: { background: location },
            }}
            className={burgerIngredientsCardStyles.My_link}
            >*/
            <li>
                <div
                    className={burgerIngredientsCardStyles.ingredient_card}
                    onClick={handleIngredientClick}
                    ref={dragRef}
                    style={{opacity}}
                >
                    {props.item.__v ? <Counter count={props.item.__v}/> : null}
                    <img src={props.item.image} alt={props.item.name} title={props.item.name} className="ml-4 mr-4"/>
                        <div className={'flex_row mt-1 mb-1 '}>
                            <p className='pr-2 text text_type_digits-default'>{props.item.price}</p>
                            <CurrencyIcon />
                        </div>
                    <p className={burgerIngredientsCardStyles.ingredient_name + ' text text_type_main-default'}>
                        {props.item.name}
                    </p>
                </div>
            </li>
       /*</Link>*/


    );
});

BurgerIngredientsCard.propTypes = {
    item: ingredientSimplifiedType3.isRequired
};

export default BurgerIngredientsCard;
