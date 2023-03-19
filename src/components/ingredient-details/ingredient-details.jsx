import ingredientDetailsStyles from './ingredient-details.module.css';
import {ingredientSimplifiedType4 } from "../../utils/prop-types";
import {Link, useLocation } from "react-router-dom";

function IngredientDetails(props) {
let location = useLocation();
    {console.log("props.item: "+JSON.stringify(props.item))}
    return(
        <Link
            key={props.item._id}
            to={`/ingredients/${props.item._id}`}
            state={{ background: location }}
            className={ingredientDetailsStyles.My_link}
        >
        {/*<Link
            key={props.item._id}
            to={{
                // Тут мы формируем динамический путь для нашего ингредиента
                // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
                pathname: `/ingredients/${props.item._id}`,
                //pathname: '/',`
                state: { background: location },
            }}>*/}
                <div className={ingredientDetailsStyles.ingredient_details_container}>
                     <img
                        src={props.item.image_large}
                        alt={props.item.name}
                        title={props.item.name}
                    />
                    <h4 className='text text_type_main-medium mt-4 mb-8'>
                        {props.item.name}
                    </h4>
                    <ul className={ingredientDetailsStyles.ingredient_nutrition_list}>
                        <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории, ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {props.item.calories}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {props.item.proteins}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {props.item.fat}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {props.item.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>

               </Link>
    );
}

IngredientDetails.propTypes = {
    item: ingredientSimplifiedType4.isRequired
};

export default IngredientDetails;
