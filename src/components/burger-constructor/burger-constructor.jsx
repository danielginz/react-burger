import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {BUN, MAIN, SAUCE} from '../../utils/constants';

import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableConstructorElement from '../draggable-constructor-element/draggable-constructor-element';
import {orderSlice, placeOrder} from '../../services/slices/order';

import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ingredientSlice} from "../../services/slices/ingredient";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { actions } = itemsSlice;

    const { setBunItem } = burgerConstructorSlice.actions
    const { bunItem, middleItems } = useSelector(state => state.burgerConstructor);

    const { closeOrderModal } = orderSlice.actions;
    const { closeIngredientModal } = ingredientSlice.actions;

    const onOrderButtonClick = () => {
        const items = [bunItem._id];
        middleItems.map(item => items.push(item._id));
        dispatch(placeOrder(items));
    };

    const handleBunItemDrop = (newBunItem) => {
        dispatch(setBunItem(newBunItem));

        //if(bunItem !== null && bunItem._id !== undefined) {
        if(bunItem?._id) {
            dispatch(actions.decreaseQuantityValue(bunItem._id));
            dispatch(actions.decreaseQuantityValue(bunItem._id));
        }

        dispatch(actions.increaseQuantityValue(newBunItem._id));
        dispatch(actions.increaseQuantityValue(newBunItem._id));

    };

    const [, dropTopBunTarget] = useDrop({
        accept: `${BUN}`,
        drop(newBunItem) {
            handleBunItemDrop(newBunItem);
        }
    });

    const [, dropBottomBunTarget] = useDrop({
        accept: `${BUN}`,
        drop(newBunItem) {
            handleBunItemDrop(newBunItem);
        }
    });

    const [, dropMiddleItemTarget] = useDrop({
        accept: [`${SAUCE}`, `${MAIN}`]
    });

    const generateItemHash = () => (
        Math.floor(Math.random() * 10000)
    );

    const {
        orderData,
        isOrderModalOpen
    } = useSelector(
        state => state.order
    );

    const closeAllModals = () => {
        dispatch(closeOrderModal());
        dispatch(closeIngredientModal());
    };

    const totalPrice = useMemo(() => {
        if(bunItem !== null) {
            return bunItem.price * 2 + middleItems.reduce((acc, p) => acc + p.price, 0);
        }

    }, [middleItems, bunItem]);

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' ref={dropTopBunTarget}>
                    {(!!bunItem) ? (
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={bunItem.name + ' (верх)'}
                            thumbnail={bunItem.image}
                            price={bunItem.price}
                        />
                    ) : (
                        <div
                            className={
                                burgerConstructorStyles.emptyBun +
                                ' constructor-element constructor-element_pos_top'
                            }
                        >
                            &nbsp;
                        </div>
                    )}
                </li>
                <li ref={dropMiddleItemTarget}>
                    {(middleItems.length > 0 ?
                            <ul
                                className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'}
                                key='middle_items'
                            >
                                {middleItems.map((item, index) => (
                                    <DraggableConstructorElement
                                        item={item}
                                        index={index}
                                        key={item._id+generateItemHash()}
                                    />
                                ))}
                            </ul>
                            :
                            <h3
                                className={burgerConstructorStyles.warningText +
                                    ' text text_type_main-default text_color_inactive pt-6 pb-6'}

                            >
                                {totalPrice === 0 ? (
                                    'Добавьте булку и ингредиенты'
                                ) : (
                                    'Добавьте ингредиенты'
                                )}
                            </h3>
                    )}
                </li>
                <li className='pl-8' ref={dropBottomBunTarget}>
                    {!!bunItem ? (
                        <ConstructorElement
                            isLocked={true}
                            type='bottom'
                            text={bunItem.name + ' (низ)'}
                            thumbnail={bunItem.image}
                            price={bunItem.price}
                        />
                    ) : (
                        <div
                            className={
                                burgerConstructorStyles.emptyBun +
                                ' constructor-element constructor-element_pos_bottom'
                            }
                        >
                            &nbsp;
                        </div>
                    )}
                </li>
            </ul>
            <div className={
                `${burgerConstructorStyles.burger_constructor_order}
                    mr-4 mb-10
                    ${!bunItem ? burgerConstructorStyles.disabled : null}`
            }
            >
                <p className='text text_type_digits-medium'>
                    {totalPrice}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type='primary' />
                </span>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={bunItem ? onOrderButtonClick : null}
                >
                    Оформить заказ
                </Button>
            </div>

            {
                isOrderModalOpen && (
                    <Modal
                        header={null}
                        closeModal={closeAllModals}
                        isFancyCloseIcon >
                        <OrderDetails orderData={orderData} />
                    </Modal>
                )}
        </>
    );
}

export default BurgerConstructor;
