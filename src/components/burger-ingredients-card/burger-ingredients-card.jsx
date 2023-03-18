import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

import {ingredientSimplifiedType3} from "../../utils/prop-types";
import {ingredientSlice} from "../../services/slices/ingredient";
import { useLocation, useNavigate } from "react-router-dom";

const BurgerIngredientsCard = memo((props) => {
    const dispatch = useDispatch();
    const { openIngredientModal } = ingredientSlice.actions;
    const { increaseQuantityValue } = itemsSlice.actions;
    const { addMiddleItem } = burgerConstructorSlice.actions

    const navigate = useNavigate();
    let location = useLocation();


    const handleIngredientClick = () => {
        dispatch(openIngredientModal(props.item));
        console.log("AAA 1: "+JSON.stringify(props));


        console.log("AAA 2: "+JSON.stringify(location));//{"pathname":"/","search":"","hash":"","state":null,"key":"default"}
        //window.location.assign(`/ingredients/${props.item._id}`);//working
        console.log("AAA 3: "+JSON.stringify(location));

        //navigate(`/ingredients/${props.item._id}`);
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
    );
});

BurgerIngredientsCard.propTypes = {
    item: ingredientSimplifiedType3.isRequired
};

export default BurgerIngredientsCard;
