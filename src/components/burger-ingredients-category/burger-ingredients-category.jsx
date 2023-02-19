import React from 'react';
import PropTypes/*, {array}*/ from 'prop-types';
import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

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
                            value={item.__v} id={item._id} onIngredientClick={props.onIngredientClick}/>)}
                </ul>
                : <h3 className='text text_type_main-default text_color_inactive pb-6'>
                    Категория пуста
                </h3>)}
        </section>
    );
}

BurgerIngredientsCategory.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,

        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default BurgerIngredientsCategory;
