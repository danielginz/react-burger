import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import {ingredientSimplifiedType} from "../../utils/prop-types";

const BurgerIngredientsCategory = forwardRef((props, ref) => (
    <section id={props.categoryId} ref={ref}>
        <h2 className="text text_type_main-medium pt-10 mb-6">
            {props.heading}
        </h2>
        {(props.items.length > 0 ? 
            <ul className={burgerIngredientsCategoryStyles.burger_ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                {props.items.map((item) => (
                    <BurgerIngredientsCard
                        key={item._id}
                        item={item}
                    />
                ))}
            </ul>
        : <h3 className='text text_type_main-default text_color_inactive pb-6'>
                    Категория пуста
            </h3>)}
    </section>
));

BurgerIngredientsCategory.propTypes = {
    heading: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(ingredientSimplifiedType.isRequired).isRequired
};

export default BurgerIngredientsCategory;
