import { userSlice } from "./user";
import { initialState } from "./user";
import { fakePassword } from "./user";

const testName = 'Test Name';
const testPassword = '123456';
const testEmail = 'test@mail.com';

const {
  request,
  failed,
  success,
  setName,
  setPassword,
  setEmail,
  resetStatus,
  resetUserData,
  setAuthorization,
  checkAuthorization
} = userSlice.actions

describe('tests for userSlice', () => {

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, {}))
    .toEqual(initialState)
  })

  it('should set the request state', () => {
    expect(userSlice.reducer({
      ...initialState,
      userSuccess: true
    }, request()))
    .toEqual({
      ...initialState,
      userRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(userSlice.reducer({
      ...initialState,
      userRequest: true
    }, failed()))
    .toEqual({
      ...initialState,
      userFailed: true
    })
  })

  it('should set the success state', () => {
    expect(userSlice.reducer({
      ...initialState,
      userRequest: true
    }, success()))
    .toEqual({
      ...initialState,
      userSuccess: true
    })
  })

  it('should reset the error status', () => {
    expect(userSlice.reducer({
      ...initialState,
      userFailed: true
    }, resetStatus()))
    .toEqual({
      ...initialState,
      userFailed: false
    })
  })

  it('should set the user name', () => {
    expect(userSlice.reducer({
      ...initialState
    }, setName(testName)))
    .toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        name: testName
      }
    })
  })

  it('should set the user password', () => {
    expect(userSlice.reducer({
      ...initialState
    }, setPassword(testPassword)))
    .toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        password: testPassword
      }
    })
  })

  it('should set the user email', () => {
    expect(userSlice.reducer({
      ...initialState
    }, setEmail(testEmail)))
    .toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        email: testEmail
      }
    })
  })

  it('should reset the user data', () => {
    expect(userSlice.reducer({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
        password: testPassword
      }
    }, resetUserData()))
    .toEqual({
      ...initialState,
       user: {
        name: '',
        password: fakePassword,
        email: ''
       }
    })
  })

  it('should set the user as authorized', () => {
    expect(userSlice.reducer({
      ...initialState
    }, setAuthorization(true)))
    .toEqual({
      ...initialState,
      isAuthorized: true
    })
  })

  it('should set the user as unauthorized', () => {
    expect(userSlice.reducer({
      ...initialState,
      isAuthorized: true
    }, setAuthorization(false)))
    .toEqual({
      ...initialState,
      isAuthorized: false
    })
  })

  it('should check the cookies and set the user authorization accordingly', () => {
    expect(userSlice.reducer({
      ...initialState,
      isAuthorized: true
    }, checkAuthorization()))
    .toEqual({
      ...initialState,
      isAuthorized: false
    })
  })
})
