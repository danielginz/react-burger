import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useMemo, useCallback, useRef, Dispatch} from 'react'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import constructorStyles from './BurgerConstructor.module.css'
import getOrderNumber from '../../service/actions/getOrderNumber'
import { DELETE_CONSTRUCTOR_ELEMENT, HIDE_ORDER_MODAL, RELOAD_CONSTRUCTOR_LIST } from '../../service/actions/constant'
import { useDrop, useDrag } from 'react-dnd'
import { ingridientType } from '../../utils/types';
import { useNavigate} from 'react-router-dom'
import { LOGIN_URL } from '../../utils/urls'
import { useAppDispatch, useAppSelector } from '../../utils/uslessMove';

export type BurgerConstructorProps = {
  onDropHandler: (itemId : {id: string}) => void;
}

export default function BurgerConstructor(props: BurgerConstructorProps){
   
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const store = useAppSelector(store => store)
    const bun = store.con.bun && store.con.bun
    const order = useMemo(() => {
        let orderList = { 
            ingredients: [bun._id]
        } 
        store.con.constructorList.length > 0 && store.con.constructorList.forEach(item => orderList.ingredients.push(item._id))
        return orderList
    }, [store, bun])

    const price =  (bun.price * 2) + store.con.constructorList.reduce((acc, item) => acc + (item.price), 0)
        const [, dropTarget] = useDrop({
            accept: "ingridient",
            drop(itemId: {id: string}) {
                props.onDropHandler(itemId);
            },
        });
        const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
            const dragCard = store.con.constructorList[dragIndex];
            const newCards = [...store.con.constructorList]
            newCards.splice(dragIndex, 1)
            newCards.splice(hoverIndex, 0, dragCard)
            dispatch({
              type: RELOAD_CONSTRUCTOR_LIST,
              array: newCards,
            })
          }, [store, dispatch]);
    return (
        <div>
        <div className={constructorStyles.element} ref={dropTarget}>
        {Object.keys(bun).length === 0 && store.con.constructorList.length === 0 && 
          <p className={`${constructorStyles.voidText} text text_type_main-medium`}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>
        }
        {Object.keys(bun).length !== 0 && <ConstructorElement type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_large}/>}
                    { store.con.constructorList.length > 0 ?
                     <div className={constructorStyles.scroll_container}>
                        {
                             store.con.constructorList.map((_, index) => (<IngridientItem 
                                item={_} 
                                index={index} 
                                dispatch={dispatch} 
                                key={store.con.uuids[index]} 
                                moveCard={moveCard}
                              />))
                        }
                       
                    </div> : <div className={constructorStyles.placeholder}></div>
                      }
                    {Object.keys(bun).length !== 0 && <ConstructorElement type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_large}/>}
            </div>
             <div className={constructorStyles.footer + ' mt-10'}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{price ? price: 0}</span>
                    <span className={constructorStyles.icon}><CurrencyIcon type='primary'/></span>
                </p>
                {/* Почемуто у меня показывает что нет свойства children у табов и кнопок из библиотек. Наставник сказал пока сделать так, он не понимает в чем дело, я тоже : ( */}

                <Button disabled={store.order.orderNumberRequest}
                        type="primary" size="medium" htmlType="button" onClick={() => store.user.auth ? dispatch(getOrderNumber(order)) :navigate(LOGIN_URL)}> {store.order.orderNumberRequest ? 'Обработка заказа' : 'Оформить заказ'}</Button>

            </div>
            { store.order.orderShow &&
                <Modal onClose={() => dispatch({type: HIDE_ORDER_MODAL})}>
                    <OrderDetails order={`${store.order.orderNumber}`}/>
                </Modal> }
            </div>
    )
}

export type IngridientItemProps = {
  item: ingridientType;
  index: number;
  dispatch: Dispatch<any>;
  moveCard:  (dragIndex: number, hoverIndex: number) => void
}

const IngridientItem = ({item, index, dispatch, moveCard} : IngridientItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item : any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY && hoverClientY < hoverMiddleY) {
        return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e : any) => e.preventDefault();
    return (
        <div className={constructorStyles.item} ref={ref}
        style={{ opacity }}
        onDrop={preventDefault}
        data-handler-id={handlerId}>
          <div className='mr-2'>
            <DragIcon type='primary'/>
          </div>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                handleClose={() => dispatch({type: DELETE_CONSTRUCTOR_ELEMENT, index: index})}
                thumbnail={item.image_large}/>
        </div>
    )
}
