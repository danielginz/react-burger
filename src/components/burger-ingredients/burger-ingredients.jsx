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
        onChange: (inView) => {
            if (inView) {
                console.log("AAA, inView: " + inView);
                if (inViewBun) {
                    console.log("AAA, inViewBun: " + inViewBun);
                    setCurrent(`${BUN}`);
                } else if (inViewSauce) {
                    console.log("AAA, inViewSauce: " + inViewSauce);
                    setCurrent(`${SAUCE}`);
                } else if (inViewMain) {
                    console.log("AAA, inViewMain: " + inViewMain);
                    setCurrent(`${MAIN}`);
                }
            }
        },
        trackVisibility: true,
        delay: 100
    };
    const [bunRef, inViewBun] = useInView(inViewOptions);
    const [mainRef, inViewMain] = useInView(inViewOptions);
    const [sauceRef, inViewSauce] = useInView(inViewOptions);

    /*useEffect(() => {
        if (inViewBun) {
            setCurrent(`${BUN}`);
        }
        else if (inViewSauce) {
            setCurrent(`${SAUCE}`);
        }
        else if (inViewMain) {
            setCurrent(`${MAIN}`);
        }
    }, [inViewBun, inViewMain, inViewSauce]);*/

    const closeAllModals = () => {
        dispatch(closeOrderModal());
        dispatch(closeIngredientModal());
    };

    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab
                    active={current === `${BUN}`}
                    onClick={handleBunTabClick}
                >
                    Булки
                </Tab>
                <Tab
                    active={current === `${SAUCE}`}
                    onClick={handleSauceTabClick}
                >
                    Соусы
                </Tab>
                <Tab
                    active={current === `${MAIN}`}
                    onClick={handleMainTabClick}
                >
                    Начинки
                </Tab>
            </div>
            <div
                className={burgerIngredientsStyles.scroll_container}
            >
                <BurgerIngredientsCategory
                    heading="Булки"
                    categoryId='bun'
                    items={items.filter(item => item.type === `${BUN}`)}
                    ref={bunRef}
                />
                <BurgerIngredientsCategory
                    heading="Соусы"
                    categoryId='sauce'
                    items={items.filter(item => item.type === `${SAUCE}`)}
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory
                    heading="Начинки"
                    categoryId='main'
                    items={items.filter(item => item.type === `${MAIN}`)}
                    ref={mainRef}
                />
            </div>

            {
                selectedIngredient.name !== undefined && (
                    <Modal
                        header='Детали ингредиента'
                        closeModal={closeAllModals} >
                        <IngredientDetails item={selectedIngredient} />
                    </Modal>
                )}

        </>
    );
}

export default BurgerIngredients;
