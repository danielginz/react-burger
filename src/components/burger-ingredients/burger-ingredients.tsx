import {useState, useEffect, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useInView } from 'react-intersection-observer';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, MAIN, SAUCE} from '../../utils/constants';
import {orderSlice} from "../../services/slices/order";
import {ingredientSlice} from "../../services/slices/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState(`${BUN}`)
    // @ts-ignore
    const { items } = useSelector(state => state.items);

    const dispatch = useDispatch();
    const { closeOrderModal } = orderSlice.actions;
    const { closeIngredientModal } = ingredientSlice.actions;

    const {
        selectedIngredient
    } = useSelector(
        // @ts-ignore
        state => state.ingredient
    );

    const setTab = (tabName: string): void => {
        setCurrent(tabName);
        document.getElementById(tabName)?.scrollIntoView({behavior:"smooth"})
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
                Соберите бургер
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab
                    active={current === `${BUN}`}
                    onClick={handleBunTabClick}
                    value='Булки'
                >
                    Булки
                </Tab>
                <Tab
                    active={current === `${SAUCE}`}
                    onClick={handleSauceTabClick}
                    value='Соусы'
                >
                    Соусы
                </Tab>
                <Tab
                    active={current === `${MAIN}`}
                    onClick={handleMainTabClick}
                    value='Начинки'
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
                    items={items.filter((item: { type: string; }) => item.type === 'bun')}
                    ref={bunRef}
                />
                <BurgerIngredientsCategory
                    heading="Соусы"
                    categoryId='sauce'
                    items={items.filter((item: { type: string; }) => item.type === 'sauce')}
                    ref={sauceRef}
                />

                <BurgerIngredientsCategory
                    heading="Начинки"
                    categoryId='main'
                    items={items.filter((item: { type: string; }) => item.type === 'main')}
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
            {/* </Link>*/}
        </>
    );
}

export default BurgerIngredients;
