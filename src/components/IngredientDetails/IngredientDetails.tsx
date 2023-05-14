import React from 'react'
import detailsStyles from './IngredientDetails.module.css'
import { ingridientType } from '../../utils/types';

export type IngredientDetailsProps = ingridientType | null

export default function IngredientDetails(props : IngredientDetailsProps){
    if(props === null){
        return null;
    }
    return(
        <div className={detailsStyles.container}>
            <img src={props.image_large} alt="img" />
            <h2 className="text text_type_main-medium mt-4">{props.name}</h2>
            <div className={detailsStyles.info}>
                <Item title='Калории,ккал' number={props.calories}/>
                <Item title='Белки, г' number={props.proteins}/>
                <Item title='Жиры, г' number={props.fat}/>
                <Item title='Углеводы, г' number={props.carbohydrates}/>
            </div>
        </div>
    )
}

export type ItemProps = {
    title: string;
    number: number;
}

const Item = (props: ItemProps) => 
    <div className={detailsStyles.item}>
        <p className="text text_type_main-default">{props.title}</p>
        <p className='text text_type_digits-default mt-2'>{props.number}</p>
    </div>