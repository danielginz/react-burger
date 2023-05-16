import React from 'react'
import {useMatch } from 'react-router-dom'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'
import { ingridientType } from '../utils/types';
import { useAppSelector } from '../utils/uslessMove';

export default function IngredientPage(){
    const ingredients : ingridientType[] = useAppSelector((store) => store.ingridients.burgerIngridients)
    //const match = useRouteMatch<{id: string}>('/ingredients/:id');
    const match = useMatch('/ingredients/:id');
    return(
            <IngredientDetails {...ingredients.filter((item: ingridientType) => item._id === match?.params?.id)[0]}/>
    )
}