import React, { useCallback, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UPDATE_BUN, UPDATE_CONSTRUCTOR_LIST } from '../../service/actions/constant'
import getIngridients from '../../service/actions/getIngridients'
import mainStyles from './Main.module.css'
import { v1 as uuidv1 } from 'uuid';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import {ingridientType } from '../../utils/types'
import { useAppDispatch, useAppSelector } from '../../utils/uslessMove';

export default function Main(){

    const dispatch = useAppDispatch()

    const {burgerIngridients} = useAppSelector((store) => store.ingridients)
    useEffect(() => {
        dispatch(getIngridients())
    }, [dispatch])
    
    const handleDrop = useCallback((itemId : {id: string}) => {
        let item :ingridientType = burgerIngridients.filter((item: ingridientType) => item._id === itemId.id)[0] 
        item.type === 'bun' ? dispatch({type: UPDATE_BUN, item: item}) : dispatch({type: UPDATE_CONSTRUCTOR_LIST, item: item, uuid: uuidv1()})
    }, [dispatch, burgerIngridients])
    return(
        <main>
            <div className={mainStyles.container}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
               
               {burgerIngridients.length !== 0 && <div className={mainStyles.content}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor onDropHandler={handleDrop}/>
                    </DndProvider>
                </div>}
            </div>
        </main>
    )
}