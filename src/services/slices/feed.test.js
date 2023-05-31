import { feedSlice } from "./feed";
import { initialState } from "./feed";

const testOrder = {
  _id: 123,
  name: "Тестовый заказ",
  updatedAt: "2021-07-29T17:07:35.495Z"
};

const testOrder2 = {
  _id: 234,
  name: "Тестовый заказ 2",
  updatedAt: "2021-07-25T14:07:35.495Z"
};

const testOrder3 = {
  _id: 345,
  name: "Тестовый заказ 3",
  updatedAt: "2021-07-19T13:07:35.495Z"
};

const testTotal = 100;
const testTotalToday = 10;

const {
  request,
  failed,
  success,
  setOrdersData
} = feedSlice.actions

describe('tests for feedSlice', () => {

  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, {}))
    .toEqual(initialState)
  })

  it('should set the request state', () => {
    expect(feedSlice.reducer({
      ...initialState,
      feedSuccess: true
    }, request()))
    .toEqual({
      ...initialState,
      feedRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(feedSlice.reducer({
      ...initialState,
      feedRequest: true
    }, failed()))
    .toEqual({
      ...initialState,
      feedFailed: true
    })
  })

  it('should set the success state', () => {
    expect(feedSlice.reducer({
      ...initialState,
      feedRequest: true
    }, success()))
    .toEqual({
      ...initialState,
      feedSuccess: true
    })
  })

  it('should sort orders by time and set its data to the state', () => {
    expect(feedSlice.reducer({
      ...initialState
    }, setOrdersData({
      orders: [
        testOrder3,
        testOrder2,
        testOrder
      ],
      total: testTotal,
      totalToday: testTotalToday
    })))
    .toEqual({
      ...initialState,
      orders: [
        testOrder,
        testOrder2,
        testOrder3
      ],
      ordersTotal: testTotal,
      ordersTotalToday: testTotalToday
    })
  })
})
