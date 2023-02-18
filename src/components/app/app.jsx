import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import appStyles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

    const [ingredientsData, setIngredientsData] = useState({
        items: [],
        isLoading: false,
        hasLoaded: false,
        hasError: false
    });
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [orderId, setOrderId] = useState('034536');
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        const getIngredientsData = () => {
            setIngredientsData({...ingredientsData, isLoading: true, hasError: false, hasLoaded: false})
             fetch(API_URL)
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

    const closeAllModals = () => {
        setIsOrderModalOpen(false);
        setIsIngredientModalOpen(false);
    };

    const openOrderModal = () => {
        setIsOrderModalOpen(true);
    };

    const openIngredientModal = useCallback((clickedItem) => {
            setSelectedItem(clickedItem);
            setIsIngredientModalOpen(true);
        }, []
    );

    const bunItem = ingredientsData.items.filter(item => item.type === 'bun')[0];
    const middleItems = ingredientsData.items.filter(item => (item.type === 'sauce' || item.type === 'main')).slice(4, 12);

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
                            <BurgerIngredients items={ingredientsData.items} onIngredientClick={openIngredientModal} />
                        </section>
                        <section className={appStyles.container_right + ' ml-5'}>
                            <BurgerConstructor bunItem={bunItem} middleItems={middleItems} onOrderButtonClick={openOrderModal} />
                        </section>
                    </div>
                )}
            {
                isOrderModalOpen && (
                    <Modal
                        header={null}
                        closeModal={closeAllModals}
                        isFancyCloseIcon >
                        <OrderDetails orderId={orderId} />
                    </Modal>
                )}
            {
                isIngredientModalOpen && (
                    <Modal
                        header='Детали ингредиента'
                        closeModal={closeAllModals} >
                        <IngredientDetails item={selectedItem} />
                    </Modal>
                )}
        </>
    );
}

export default App;
