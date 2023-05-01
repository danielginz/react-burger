import { useSelector } from "react-redux";
import orderDetailedViewStyles from './order-detailed-view.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../utils/utils'

import {FC, useCallback, useEffect, useState} from 'react';
import {IIngredient, IOrder} from "../../services/types";

interface IOrderDetailedView {
    order: IOrder,
    isOrderModal?: boolean
}

type TOrderStatus = 'Создан' | 'Готовится' | 'Выполнен' | 'Отменён' | '';

const OrderDetailedView: FC<IOrderDetailedView> = ({ order, isOrderModal=false }) => {

    const {
        items
    } = useSelector(
        // @ts-ignore
        state => state.items
    );
    const [orderStatusName, setOrderStatusName] = useState<TOrderStatus>('');
    const [orderStatusClass, setOrderStatusClass] = useState<string>('');

    // defining the order status text and class based on status string from server
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
                setOrderStatusClass(orderDetailedViewStyles.status_completed);
                break;

            case 'canceled':
                setOrderStatusName('Отменён')
                setOrderStatusClass(orderDetailedViewStyles.status_canceled);
                break;

            default:
                break;
        }
    }, [order.status]);

    const getOrderDateTime = useCallback(():string => (
        !!order.createdAt ? formatDateTime(order.createdAt) : ''
    ), [order.createdAt]);

    const orderedIngredients: Array<IIngredient> = !!order.ingredients ? (
        order.ingredients.map(item_id => (
            items.find((item: { _id: IIngredient; }) => item?._id === item_id)
        ) || {})
    ) : []

    const orderedBun: IIngredient = orderedIngredients.find(
        item => item.type === 'bun'
    ) || {};

    const orderedMiddleItems: Array<IIngredient> = orderedIngredients.filter(
        item => item.type !== 'bun'
    );

    const renderIngredientIcons = useCallback((): Array<IIngredient> => {
        const itemsToRender: Array<IIngredient> = orderedMiddleItems;
        itemsToRender.splice(0, 0, orderedBun);

        type TCountedItem = IIngredient & { count?: number };

        type TUniqueCountedItems = {
            [_id: string]: TCountedItem
        }

        const countedItems: Array<TCountedItem> = itemsToRender?.map((item) => {
            return { count: 1, ...item }
        });

        const uniqueCountedItems:TUniqueCountedItems = countedItems.reduce<TUniqueCountedItems>(
            (a:any, b:TCountedItem) => {
                if (!!b._id) {
                    a[b._id] =
                        {
                            ...b,
                            count: ( !!a[b._id] ? a[b._id].count : 0) + (b.type === 'bun' ? 2 : 1),
                        }
                    return a
                }
                else return null
            }, {});

        const renderedItems: Array<JSX.Element> = [];
        for (let item_id in uniqueCountedItems) {
            renderedItems.push(
                <li
                    className={orderDetailedViewStyles.ingredient_wrapper}
                    key={uniqueCountedItems[item_id]._id}>
          <span
              className='ingredient_icon_wrapper'
          >
            <img
                src={uniqueCountedItems[item_id].image_mobile}
                alt={uniqueCountedItems[item_id].name}
                title={uniqueCountedItems[item_id].name}
                width='112px'
                className='ingredient_icon'
            />
          </span>
                    <p className={
                        orderDetailedViewStyles.ingredient_name +
                        ' text text_type_main-default'
                    }>
                        {uniqueCountedItems[item_id].name}
                    </p>
                    <span className={orderDetailedViewStyles.ingredient_price}>
            <p className='text text_type_digits-default'>
              {`${uniqueCountedItems[item_id].count} x ${uniqueCountedItems[item_id].price}`}
            </p>
            <CurrencyIcon type='primary'/>
          </span>
                </li>
            )
        };
        return renderedItems;
    }, [orderedMiddleItems, orderedBun]);

    const calculateOrderPrice = useCallback((): number => {
        const orderIngredients: Array<IIngredient> = order.ingredients?.map(item_id => {
            const orderedItem: IIngredient = items.find((item: { _id: IIngredient; }) => item._id === item_id) || {};
            return ({
                price: orderedItem.price,
                type: orderedItem.type
            })
        }) || [];
        const bunPrice: number = orderIngredients.find(item => item.type === 'bun')?.price || 0;
        return(bunPrice * 2 + orderIngredients.reduce((acc, p) => (
                acc + (p.type !== 'bun' ? (p.price || 0) : 0)), 0)
        );
    }, [items, order.ingredients]);


    return(
        <div className={orderDetailedViewStyles.order_container}>
            {!isOrderModal &&
                <p className={
                    orderDetailedViewStyles.order_id +
                    ' text text_type_digits-default'
                }>
                    {`#${order.number?.toString().padStart(6, '0')}`}
                </p>
            }
            <p className={'mt-10 mb-3 text text_type_main-medium'}>
                {order.name}
            </p>
            <p className={
                `${orderStatusClass} mt-2 text text_type_main-default`
            }>
                {orderStatusName}
            </p>
            <p className={'mt-15 mb-6 text text_type_main-medium'}>
                Состав:
            </p>
            <ul className={orderDetailedViewStyles.ingredients_container + ' pr-6'}>
                {renderIngredientIcons().toString()}

            </ul>
            <div className={orderDetailedViewStyles.order_info + ' mt-10'}>
                <p className='text text_type_main-default text_color_inactive'>
                    {getOrderDateTime()}
                </p>
                <div className={'flex_row ml-6'}>
                    <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>
    );
};
export default OrderDetailedView;
