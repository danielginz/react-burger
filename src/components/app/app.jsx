import { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useSelector, useDispatch } from "react-redux";
import { getItems } from '../../services/slices/items';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
    const dispatch = useDispatch();

    const {
        itemsRequest,
        itemsSuccess,
        itemsFailed
    } = useSelector(
        state => state.items
    );

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            {
                itemsFailed &&
                !itemsRequest &&
                !itemsSuccess && (
                    <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
                        Ошибка загрузки
                    </h2>
                )}
            {
                itemsRequest &&
                !itemsFailed &&
                !itemsSuccess && (
                    <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
                        Загрузка...
                    </h2>
                )}
            {
                itemsSuccess &&
                !itemsFailed &&
                !itemsRequest && (
                    <div className={appStyles.container}>
                        <DndProvider backend={HTML5Backend}>
                            <section className={appStyles.container_left + ' mr-5'}>
                                <BurgerIngredients />
                            </section>
                            <section className={appStyles.container_right + ' ml-5'}>
                                <BurgerConstructor />
                            </section>
                        </DndProvider>
                    </div>
                )}
        </>
    );
}

export default App;
