import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ordersCardStyles from './orders-card.module.css';

import { formatDateTime } from '../../utils/utils'

import {FC, useCallback, useEffect, useState} from 'react';
import {IIngredient, IOrder} from "../../services/types";

interface IOrdersCardProps {
    order: IOrder,// here is exception
    source: string/*,
    key: string*/
}

const OrdersCard: FC<IOrdersCardProps> = ({order, source/*, key*/}) => {
    //console.log("AAA, orders-card, order: "+JSON.stringify(order)+", source: "+source/*+", key: "+key*/)
    const {
        items
    } = useSelector(
        // @ts-ignore
        state => state.items
    );

    //console.log("AAA, orders-card, items: "+JSON.stringify(items));

    const navigate = useNavigate();
    const [orderStatusName, setOrderStatusName] = useState<string>('');
    const [orderStatusClass, setOrderStatusClass] = useState<string>('');

    useEffect(() => {
        switch (order.status) {
            case 'created':
                setOrderStatusName('Создан');
                break;

            case 'pending':
                setOrderStatusName('Готовится');
                break;

            case 'done':
                setOrderStatusName('Выполнен')
                setOrderStatusClass(ordersCardStyles.status_completed);
                break;

            // TODO: find out what status string server will send on error
            case 'canceled':
                setOrderStatusName('Отменён')
                setOrderStatusClass(ordersCardStyles.status_canceled);
                break;

            default:
                break;
        }
    }, [order.status]);

    const handleOrderClick = () => {
        const currentUrl = window.location.pathname
        navigate(`${currentUrl}/${order._id}`);
    }

    const getOrderDateTime = useCallback(() => (
        order.createdAt && formatDateTime(order.createdAt)
    ), [order.createdAt]);

    const orderedIngredients = order.ingredients &&
        order.ingredients.map(item_id => (
            items.find((item: { _id: IIngredient; }) => item._id === item_id)
        ));

    // skip if there empty or other falsy result instead of ingredient id
    const filteredOrderedIngredients = orderedIngredients &&
        orderedIngredients.filter(item => item);

    const orderedBun = filteredOrderedIngredients &&
        filteredOrderedIngredients.find(item =>
            item && item.type === 'bun');
    const orderedMiddleItems = filteredOrderedIngredients &&
        filteredOrderedIngredients.filter(item =>
            item && item.type !== 'bun');

    const renderIngredientIcons = useCallback(() => {
        const itemsToRender = orderedMiddleItems;
        // adding bun in the first place
        itemsToRender && itemsToRender.splice(0, 0, orderedBun);

        if (!!itemsToRender)
            return itemsToRender.map((ingredient, index) => {
                const ingredientsToShow = 5;
                if (index > ingredientsToShow) return null;

                return (
                    // skip if there is no bun or other invalid ingredient
                    (ingredient && ingredient._id) &&
                    <li key={ingredient._id+index}>
          <span
              className={ordersCardStyles.ingredient_icon_wrapper}
              style={{ zIndex: 10 - index }}
          >
            <img
                src={ingredient.image_mobile}
                alt={ingredient.name}
                title={ingredient.name}
                width='112px'
                className='ingredient_icon'
            />
          </span>
                        {index === ingredientsToShow ? (
                            <span
                                className={ordersCardStyles.more_ingredients_icon}
                            >
              <p className={
                  ordersCardStyles.more_icon_text +
                  ' text text_type_main-default'
              }>
                {!!itemsToRender && !!itemsToRender.length
                    ? `+${itemsToRender.length - ingredientsToShow}`
                    : null
                }
              </p>
              <span className={ordersCardStyles.more_icon_wrapper}></span>
            </span>
                        ) : null}
                    </li>
                );
            })
    }, [orderedMiddleItems, orderedBun]);

    return (
        // skip if there is no bun
        (!!orderedBun && !!orderedBun._id) ?
            <li
                className={ordersCardStyles.order_card}
                onClick={handleOrderClick}
            >
                <div className={ordersCardStyles.order_info}>
                    <p className='text text_type_digits-default'>
                        {typeof order.number === 'number'
                            ? `#${order.number.toString().padStart(6, '0')}`
                            : null
                        }
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        {getOrderDateTime()}
                    </p>
                </div>
                <p className={'mt-6 text text_type_main-medium'}>
                    {order.name}
                </p>
                {source === 'history' ?
                    <p className={
                        `${orderStatusClass} mt-2 text text_type_main-default`
                    }>
                        {orderStatusName}
                    </p>
                    : null
                }
                <div className={ordersCardStyles.order_info + ' mt-6'}>
                    <ul className={ordersCardStyles.ingredient_icons_container}>
                        {renderIngredientIcons()}
                    </ul>
                </div>
            </li>
            : null
    );
};

export default OrdersCard;
