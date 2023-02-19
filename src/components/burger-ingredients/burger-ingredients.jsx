import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('bun')
    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.scroll_container}>
                <BurgerIngredientsCategory
                    heading="Булки"
                    items={props.items.filter(item => item.type === 'bun')}
                    onIngredientClick={props.onIngredientClick}
                />
                <BurgerIngredientsCategory
                    heading="Соусы"
                    items={props.items.filter(item => item.type === 'sauce')}
                    onIngredientClick={props.onIngredientClick}
                />
                <BurgerIngredientsCategory
                    heading="Начинки"
                    items={props.items.filter(item => item.type === 'main')}
                    onIngredientClick={props.onIngredientClick}
                />
            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default BurgerIngredients;
