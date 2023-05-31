import { wsSlice } from "./websocket";
import { initialState } from "./websocket";

const {
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions

describe('tests for wsSlice', () => {

  it('should return the initial state', () => {
    expect(wsSlice.reducer(undefined, {}))
    .toEqual({
      ...initialState
    })
  })

  it('should set the stop state', () => {
    expect(wsSlice.reducer({
      ...initialState,
      wsConnected: true,
      wsError: true
    }, wsConnectionStop()))
    .toEqual({
      ...initialState
    })
  })

  it('should set the success state', () => {
    expect(wsSlice.reducer({
      ...initialState,
      wsError: true
    }, wsConnectionSuccess()))
    .toEqual({
      ...initialState,
      wsConnected: true
    })
  })

  it('should set the error state', () => {
    expect(wsSlice.reducer({
      ...initialState,
      wsConnected: true
    }, wsConnectionError()))
    .toEqual({
      ...initialState,
      wsError: true
    })
  })

  it('should set the closed state', () => {
    expect(wsSlice.reducer({
      ...initialState,
      wsConnected: true
    }, wsConnectionClosed()))
    .toEqual({
      ...initialState
    })
  })
})
