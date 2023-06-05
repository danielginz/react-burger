import { itemsSlice } from "./items";
import { initialState } from "./items";

const testItem = {
  _id: '123',
  name: "Тестовый ингредиент 1",
  quantity: 0
};

const testItem2 = {
  _id: '234',
  name: "Тестовый ингредиент 2",
  quantity: 3
};
const testItem3 = {
  _id: '345',
  name: "Тестовый ингредиент 3",
  quantity: 2
};

const {
  request,
  failed,
  success,
  increaseQuantityValue,
  decreaseQuantityValue,
  clearValues
} = itemsSlice.actions

describe('tests for itemsSlice', () => {

  it('should return the initial state', () => {
    expect(itemsSlice.reducer(undefined, {}))
    .toEqual(initialState)
  })

  it('should set the request state', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      itemsSuccess: true
    }, request()))
    .toEqual({
      ...initialState,
      itemsRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      itemsRequest: true
    }, failed()))
    .toEqual({
      ...initialState,
      itemsFailed: true
    })
  })

  it('should set the success state and set the items data', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      itemsRequest: true
    }, success([
      testItem,
      testItem2,
      testItem3
    ])))
    .toEqual({
      ...initialState,
      itemsSuccess: true,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    })
  })

  it('should increase the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, increaseQuantityValue('123')))
    .toEqual({
      ...initialState,
      items: [
        {
          ...testItem,
          quantity : 1
        },
        testItem2,
        testItem3
      ]
    })
  })

  it('should decrease the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, decreaseQuantityValue('234')))
    .toEqual({
      ...initialState,
      items: [
        testItem,
        {
          ...testItem2,
          quantity : 2
        },
        testItem3
      ]
    })
  })
  
  it('should clear qty of all items in store', () => {
    expect(itemsSlice.reducer({
      ...initialState,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, clearValues()))
    .toEqual({
      ...initialState,
      items: [
        {
          ...testItem,
          quantity : 0
        },
        {
          ...testItem2,
          quantity : 0
        },
        {
          ...testItem3,
          quantity : 0
        }
      ]
    })
  })
})
