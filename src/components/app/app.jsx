import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import appStyles from './app.module.css';

import { NORMA_API } from '../../utils/burger-api';

function App() {

    const [ingredientsData, setIngredientsData] = useState({
        items: [],
        isLoading: false,
        hasLoaded: false,
        hasError: false
    });
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const getIngredientsData = () => {
            setIngredientsData({...ingredientsData, isLoading: true, hasError: false, hasLoaded: false})
            fetch(`${NORMA_API}/ingredients`)
                .then(res => {
                    if (!res.ok) {
                        res.reject(res.statusText);
                    }
                    return res.json();
                })
                .then(({data}) => {
                    setIngredientsData({ ...ingredientsData, items: data, isLoading: false, hasLoaded: true, hasError: false })
                })
                .catch((error) => {
                    console.log(error);
                    setIngredientsData({ ...ingredientsData, isLoading: false, hasError: true, hasLoaded: false })
                })}
        getIngredientsData();
    }, []);

    const closeOrderDetailsModal = () => {
        setIsOrderModalOpen(false);
    };

    const closeIngredientDetailsModal = () => {
        setIsIngredientModalOpen(false);
    };

    const openOrderModal = () => {
        console.log("AAA, openOrderModal");
        setIsOrderModalOpen(true);
    };

    const openIngredientModal = (clickedItemId) => {
        console.log("AAA, openIngredientModal, clickedItemId: "+clickedItemId);
        const clickedItems = ingredientsData.items.filter(item => (item._id === clickedItemId));
        console.log("AAA, openIngredientModal, clickedItem: "+JSON.stringify(clickedItems[0]));
        setSelectedItem(clickedItems[0]);
        setIsIngredientModalOpen(true);
    }

    return (
        <>
            <AppHeader />
            {
                ingredientsData.hasError &&
                !ingredientsData.isLoading &&
                !ingredientsData.hasLoaded && (
                    <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
                        Ошибка загрузки
                    </h2>
                )}
            {
                ingredientsData.isLoading &&
                !ingredientsData.hasError &&
                !ingredientsData.hasLoaded && (
                    <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
                        Загрузка...
                    </h2>
                )}
            {
                ingredientsData.hasLoaded &&
                !ingredientsData.hasError &&
                !ingredientsData.isLoading && (
                    <div className={appStyles.container}>
                        <section className={appStyles.container_left + ' mr-5'}>
                            <BurgerIngredients items={ingredientsData.items}
                               onIngredientClick={openIngredientModal} />
                        </section>
                        <section className={appStyles.container_right + ' ml-5'}>
                            <BurgerConstructor items={ingredientsData.items} onOrderButtonClick={openOrderModal} />
                        </section>
                    </div>
                )}
            {
                isOrderModalOpen && (
                    <Modal
                        header={null}
                        closeModal={closeOrderDetailsModal}
                        isFancyCloseIcon >
                       {/*<OrderDetails />*/}
                        <OrderDetails item={selectedItem}/>
                    </Modal>
                )}
            {
                isIngredientModalOpen && (
                    <Modal
                        header='Детали ингредиента'
                        closeModal={closeIngredientDetailsModal} >
                        <IngredientDetails item={selectedItem} />
                    </Modal>
                )}
        </>
    );
}

export default App;
