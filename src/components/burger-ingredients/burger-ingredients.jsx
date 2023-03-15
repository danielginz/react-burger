import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, MAIN, SAUCE} from '../../utils/constants';

function BurgerIngredients() {
    const [current, setCurrent] = useState(`${BUN}`)
    const { items } = useSelector(state => state.items);

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
                    items={items.filter(item => item.type === 'bun')}
                    ref={bunRef}
                />
                <BurgerIngredientsCategory 
                    heading="Соусы"
                    categoryId='sauce' 
                    items={items.filter(item => item.type === 'sauce')}
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory 
                    heading="Начинки"
                    categoryId='main'
                    items={items.filter(item => item.type === 'main')}
                    ref={mainRef}
                />
            </div>
        </>
    );
}

export default BurgerIngredients;
