import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/prop-types';

function BurgerConstructor(props) {
    const bun = props.items.find(item => item.type === 'bun');
    const ingredients = props.items.filter(item => (item.type !== 'bun')).slice(4, 12);

    const totalPrice = useMemo(() => {
        return bun.price * 2 + ingredients.reduce((acc, p) => acc + p.price, 0);
    }, [ingredients, bun]);

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        thumbnail={bun.image}
                        price={bun.price}
                    />
                </li>
                <li>
                    {(ingredients.length > 0 ?
                            <ul className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'} key="middle_items">
                                {ingredients.map((item, index) => (
                                    <li className={burgerConstructorStyles.burger_constructor_draggable_list_item}
                                        key={item._id}>
                                    <span className={burgerConstructorStyles.burger_constructor_drag_icon}>
                                        <DragIcon type='primary' />
                                    </span>
                                        <ConstructorElement
                                            text={item.name}
                                            thumbnail={item.image}
                                            price={item.price}
                                        />
                                    </li>
                                ))}
                            </ul>
                            :
                            <h3 className={burgerConstructorStyles.warningText + ' text text_type_main-default text_color_inactive pt-6 pb-6'}>
                                Добавьте ингредиенты
                            </h3>
                    )}
                </li>
                <li className='pl-8' key="bottom_bun">
                    <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={bun.name + ' (низ)'}
                        thumbnail={bun.image}
                        price={bun.price}
                    />
                </li>
            </ul>
            <div className={burgerConstructorStyles.burger_constructor_order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {
                        totalPrice
                    }
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium" onClick={props.onOrderButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    bun: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }),

    ingredients: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    })),

    items: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    onOrderButtonClick: PropTypes.func.isRequired,

};

export default BurgerConstructor;
