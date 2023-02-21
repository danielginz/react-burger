import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import {ingredientType} from '../../utils/prop-types';

function BurgerIngredientsCategory(props) {
    return(
        <section>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.heading}
            </h2>
            {(props.items.length > 0 ?
                <ul className={burgerIngredientsCategoryStyles.burger_ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                    {props.items.map((item) =>
                        <BurgerIngredientsCard
                            name={item.name} price={item.price} image={item.image}
                            value={item.__v} id={item._id} key={item._id} onIngredientClick={props.onIngredientClick}/>)}
                </ul>
                : <h3 className='text text_type_main-default text_color_inactive pb-6'>
                    Категория пуста
                </h3>)}
        </section>
    );
}

BurgerIngredientsCategory.propTypes = {
    items: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default BurgerIngredientsCategory;
