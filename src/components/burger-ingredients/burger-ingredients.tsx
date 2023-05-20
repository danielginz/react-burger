import {useState, useEffect, FC} from 'react';
import { useAppSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, MAIN, SAUCE} from '../../utils/constants';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState(`${BUN}`)
    const { items } = useAppSelector(state => state.items);

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
                    //items={items.filter((item: { type: string; }) => item.type === 'bun')}
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
