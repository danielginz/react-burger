import { useAppSelector } from '../../services/hooks';
import {useLocation, useNavigate} from "react-router-dom";
import ordersCardStyles from './orders-card.module.css';

import { formatDateTime } from '../../services/utils'

import {FC, useCallback, useEffect, useState} from 'react';
import { IOrder} from "../../services/types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrdersCardProps {
    order: IOrder,
    source: string
}

const OrdersCard: FC<IOrdersCardProps> = ({order, source}) => {
    const {
        items
    } = useAppSelector(
        state => state.items
    );

    let location = useLocation();

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
        navigate(`${currentUrl}/${order._id}`, { state: { background: location } });
    }

    const getOrderDateTime = useCallback(() => (
        order.createdAt && formatDateTime(order.createdAt)
    ), [order.createdAt]);

    const orderedIngredients = order.ingredients &&
        order.ingredients.map(item_id => (
            items.find(item => item._id === item_id)
        ));

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
        itemsToRender && itemsToRender.splice(0, 0, orderedBun);

        if (!!itemsToRender)
            return itemsToRender.map((ingredient, index) => {
                const ingredientsToShow = 5;
                if (index > ingredientsToShow) return null;

                return (
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

    const calculateOrderPrice = useCallback(() => (
        orderedBun && orderedBun.price && orderedMiddleItems ?
            (
                orderedBun.price + orderedMiddleItems.reduce((acc, p) =>
                    !!p ? (acc + (p.price || 0)) : 0, 0)
            ) : ( 0 )
    ), [orderedBun, orderedMiddleItems]);

    return (
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
                    <div className={'flex_row ml-6'}>
                        <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </li>
            : null
    );


};

export default OrdersCard;
