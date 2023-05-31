import { orderSlice } from "./order";
import { initialState } from "./order";

const testOrder = {
  name: 'Тестовый заказ',
  id: '123',
  success: true
};

const {
  request,
  failed,
  success,
  openOrderModal,
  closeOrderModal
} = orderSlice.actions

describe('tests for orderSlice', () => {

  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, {}))
    .toEqual(initialState)
  })

  it('should set the request state and reset order data', () => {
    expect(orderSlice.reducer({
      ...initialState,
      orderSuccess: true,
      orderData: testOrder
    }, request()))
    .toEqual({
      ...initialState,
      orderRequest: true,
      orderData: {}
    })
  })

  it('should set the failed state', () => {
    expect(orderSlice.reducer({
      ...initialState,
      orderRequest: true,
      orderData: testOrder
    }, failed()))
    .toEqual({
      ...initialState,
      orderFailed: true,
      orderData: { success: false }
    })
  })

  it('should set the success state and set order data', () => {
    expect(orderSlice.reducer({
      ...initialState,
      orderRequest: true
    }, success({
      name: testOrder.name,
      number: testOrder.id,
      success: testOrder.success
    })))
    .toEqual({
      ...initialState,
      orderSuccess: true,
      orderData: testOrder
    })
  })

  it('should open the OrderModal', () => {
    expect(orderSlice.reducer({
      ...initialState
    }, openOrderModal()))
    .toEqual({
      ...initialState,
      isOrderModalOpen: true
    })
  })

  it('should close the OrderModal', () => {
    expect(orderSlice.reducer({
      ...initialState,
      isOrderModalOpen: true
    }, closeOrderModal()))
    .toEqual({
      ...initialState
    })
  })
})
