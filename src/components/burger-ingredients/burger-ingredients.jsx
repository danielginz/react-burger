import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useInView } from 'react-intersection-observer';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {orderSlice} from "../../services/slices/order";
import {ingredientSlice} from "../../services/slices/ingredient";

import {BUN, MAIN, SAUCE} from '../../utils/constants';

function BurgerIngredients() {
    const [current, setCurrent] = useState(`${BUN}`)

    const { items } = useSelector(state => state.items);

    const dispatch = useDispatch();
    const { closeOrderModal } = orderSlice.actions;
    const { closeIngredientModal } = ingredientSlice.actions;

    const {
        selectedIngredient
    } = useSelector(
        state => state.ingredient
    );

    const setTab = (tabName) => {
        setCurrent(tabName);
        document.getElementById(tabName).scrollIntoView({behavior:"smooth"})
    }
    const handleBunTabClick = () => {
        setTab(`${BUN}`);
    };
    const handleSauceTabClick = () => {
        setTab(`${SAUCE}`);
    };
    const handleMainTabClick = () => {
        setTab(`${MAIN}`);
    };

    const inViewOptions = {
        threshold: 0,
        trackVisibility: true,
        delay: 100
    };
    const [bunRef, inViewBun] = useInView(inViewOptions);
    const [mainRef, inViewMain] = useInView(inViewOptions);
    const [sauceRef, inViewSauce] = useInView(inViewOptions);

    useEffect(() => {
        if (inViewBun) {
            setCurrent(`${BUN}`);
        }
        else if (inViewSauce) {
            setCurrent(`${SAUCE}`);
        }
        else if (inViewMain) {
            setCurrent(`${MAIN}`);
        }
    }, [inViewBun, inViewMain, inViewSauce]);

    const closeAllModals = () => {
        dispatch(closeOrderModal());
        dispatch(closeIngredientModal());
    };

    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                ???????????????? ????????????
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab
                    active={current === `${BUN}`}
                    onClick={handleBunTabClick}
                >
                    ??????????
                </Tab>
                <Tab
                    active={current === `${SAUCE}`}
                    onClick={handleSauceTabClick}
                >
                    ??????????
                </Tab>
                <Tab
                    active={current === `${MAIN}`}
                    onClick={handleMainTabClick}
                >
                    ??????????????
                </Tab>
            </div>
            <div
                className={burgerIngredientsStyles.scroll_container}
            >
                <BurgerIngredientsCategory
                    heading="??????????"
                    categoryId='bun'
                    items={items.filter(item => item.type === `${BUN}`)}
                    ref={bunRef}
                />
                <BurgerIngredientsCategory
                    heading="??????????"
                    categoryId='sauce'
                    items={items.filter(item => item.type === `${SAUCE}`)}
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory
                    heading="??????????????"
                    categoryId='main'
                    items={items.filter(item => item.type === `${MAIN}`)}
                    ref={mainRef}
                />
            </div>

            {
                selectedIngredient.name !== undefined && (
                    <Modal
                        header='???????????? ??????????????????????'
                        closeModal={closeAllModals} >
                        <IngredientDetails item={selectedIngredient} />
                    </Modal>
                )}

        </>
    );
}

export default BurgerIngredients;
