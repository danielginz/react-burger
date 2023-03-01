import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import draggableConstructorElementStyles from './draggable-constructor-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';
import { ingredientSimplifiedType2 } from "../../utils/prop-types";

function DraggableConstructorElement({ item, index }) {
  const dispatch = useDispatch();
  const { decreaseQuantityValue } = itemsSlice.actions;
  const { moveMiddleItem, deleteMiddleItem } = burgerConstructorSlice.actions

  const dndItemRef = useRef();
  const [isItemHigher, setIsItemHigher] = useState(false);
  const [isItemLower, setIsItemLower] = useState(false);

  const [{targetId, isItemHover, offset}, dropItemTarget] = useDrop({
      accept: 'sortedIngredient',
      drop() {
          return ({index});
      },
      collect: monitor => ({
          targetId: monitor.getHandlerId(),
          isItemHover: monitor.isOver(),
          offset: monitor.getDifferenceFromInitialOffset()
      })
    });

  const [{sourceId, isItemDragging}, dragItemSource] = useDrag({
      type: 'sortedIngredient',
      item: item,
      collect: monitor => ({
          sourceId: monitor.getHandlerId(),
          isItemDragging: monitor.isDragging()
      }),
      end(item, monitor) {
        if(monitor.didDrop()) {
          dispatch(moveMiddleItem({
            oldIndex: index,
            newIndex: monitor.getDropResult().index
          }));
        }
      }
  });

  const handleItemDelete = (itemId, index) => {   
    dispatch(deleteMiddleItem(index));
    dispatch(decreaseQuantityValue(itemId));
};

useEffect(() => {
  if(!!offset) {
    setIsItemHigher(offset.y < 0);
    setIsItemLower(offset.y > 0);    
  }
}, [offset]);

dragItemSource(dropItemTarget(dndItemRef))

  return (
      <>
        <li 
            className={
                `${draggableConstructorElementStyles.draggable_list_item}
                ${isItemDragging ? draggableConstructorElementStyles.dragged : null}
                ${isItemHover && isItemHigher ? (
                  draggableConstructorElementStyles.pushedUp
                  ) : isItemHover && isItemLower ? (
                    draggableConstructorElementStyles.pushedDown
                  ) : null }`
                }
            ref={dndItemRef}
            data-source-id={sourceId}
            data-target-id={targetId}
        >
            <span className={draggableConstructorElementStyles.drag_icon}>
                <DragIcon type='primary' />
            </span>
            <ConstructorElement 
                text={item.name}
                thumbnail={item.image}
                price={item.price}
                handleClose={() => 
                    handleItemDelete(item._id, index)
                }
            />
        </li>
      </>
  )
}
export default DraggableConstructorElement

DraggableConstructorElement.propTypes = {
    item: ingredientSimplifiedType2.isRequired,
    index: PropTypes.number.isRequired
};
