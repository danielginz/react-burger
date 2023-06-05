import { burgerConstructorSlice } from "./burger-constructor";
import { initialState } from "./burger-constructor";
//import { useForm } from "../useForm";

//const {testBunItemAAA, handleChange, setValues} = useForm({_id: 123, name: "Тестовая булка", price: 100});

/*const myFunc = () => {
  const {testBunItem, handleChange, setValues} = useForm({_id: 123, name: "Тестовая булка", price: 100});
  return {testBunItem, handleChange, setValues};
}*/

const testBunItem = {
  _id: 123,
  name: "Тестовая булка",
  price: 100
};

const testBunItem2 = {
  _id: 234,
  name: "Тестовая булка 2",
  price: 200
};

const testMiddleItem = {
  _id: 345,
  name: "Тестовый ингредиент 1",
  price: 300
};

const testMiddleItem2 = {
  _id: 456,
  name: "Тестовый ингредиент 2",
  price: 400
};
const testMiddleItem3 = {
  _id: 567,
  name: "Тестовый ингредиент 3",
  price: 500
};

const {
  addMiddleItem,
  moveMiddleItem,
  deleteMiddleItem,
  clearMiddleItems,
  setBunItem
} = burgerConstructorSlice.actions

describe('tests for burgerConstructorSlice', () => {

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, {}))
    .toEqual(initialState)
  })

  it('should add the middle item', () => {
    expect(burgerConstructorSlice.reducer(
        initialState,
      addMiddleItem(testMiddleItem)
    ).middleItems.length)
    .toEqual({
      ...initialState,
      middleItems: [testMiddleItem]
    }.middleItems.length)
  })

  it('should add another middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        middleItems: [
          testMiddleItem
        ]
      },
      addMiddleItem(testMiddleItem2)
    ).middleItems.length)
    .toEqual({
      ...initialState,
      middleItems: [
        testMiddleItem,
        testMiddleItem2
      ]
    }.middleItems.length)
  })

  it('should add third middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        middleItems: [
          testMiddleItem,
          testMiddleItem2
        ]
      },
      addMiddleItem(testMiddleItem3)
    ).middleItems.length)
    .toEqual({
      ...initialState,
      middleItems: [
        testMiddleItem,
        testMiddleItem2,
        testMiddleItem3
      ]
    }.middleItems.length)
  })

  it('should move first middle item to make it last', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        middleItems: [
          testMiddleItem,
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      moveMiddleItem(0, 2)
    )) 
    .toEqual({
      ...initialState,
      middleItems: [
        testMiddleItem,
        testMiddleItem2,
        testMiddleItem3
      ]
    })
  })

  it('should remove the second middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        middleItems: [
          testMiddleItem,
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      deleteMiddleItem(1)
    )) 
    .toEqual({
      ...initialState,
      middleItems: [
        testMiddleItem,
        testMiddleItem3
      ]
    })
  })

  it('should clear all middle items', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        middleItems: [
          testMiddleItem,          
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      clearMiddleItems()
    )) 
    .toEqual(initialState)
  })

  it('should add the bun', () => {
    //const {testBunItem, handleChange, setValues} = myFunc();
    expect(burgerConstructorSlice.reducer(
        initialState,
      setBunItem(testBunItem)
    ))
    .toEqual({
      ...initialState,
      bunItem: testBunItem
    })
  })

  it('should replace the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        bunItem: testBunItem
      },
      setBunItem(testBunItem2)
    ))
    .toEqual({
      ...initialState,
      bunItem: testBunItem2
    })
  })

  it('should remove the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initialState,
        bunItem: testBunItem
      },
      setBunItem({})
    ))
    .toEqual(initialState)
  })
})
