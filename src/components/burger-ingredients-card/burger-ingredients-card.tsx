import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../services/types";

const BurgerIngredientsCard = memo<IIngredient>(
    ( item ) => {
    const dispatch = useDispatch();
    const { increaseQuantityValue } = itemsSlice.actions;
    const { addMiddleItem } = burgerConstructorSlice.actions

    let location = useLocation();

    const [{opacity}, dragRef] = useDrag({
        type: item.type || '',
        item: item,
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
        <Link
            key={item._id}
            to={`/ingredients/${item._id}`}
            state={{ background: location }}
            className={burgerIngredientsCardStyles.My_link}
        >
            <li>
                <div
                    className={burgerIngredientsCardStyles.ingredient_card}
                    ref={dragRef}
                    style={{opacity}}
                >

                    {item.quantity ? <Counter count={item.quantity}/> : null}
                    <img src={item.image} alt={item.name} title={item.name} className="ml-4 mr-4"/>
                    <div className={'flex_row mt-1 mb-1 '}>
                        <p className='pr-2 text text_type_digits-default'>{item.price}</p>
                        <CurrencyIcon  type='primary'/>
                    </div>
                    <p className={burgerIngredientsCardStyles.ingredient_name + ' text text_type_main-default'}>
                        {item.name}
                    </p>
                </div>
            </li>
        </Link>
    );
});


export default BurgerIngredientsCard;
