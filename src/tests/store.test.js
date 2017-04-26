/* global describe, test, expect */
import configureStore from '../store/configureStore'
const store = configureStore()

describe('Test configureStore() functionality:', () => {
  test('configureStore() returns a store object', () => {
    expect(typeof store).toBe('object')
  })

  test('store is a valid Redux store', () => {
    expect(store).toEqual(expect.objectContaining({
      dispatch: expect.any(Function),
      getState: expect.any(Function),
      replaceReducer: expect.any(Function),
      subscribe: expect.any(Function),
    }))
  })
})
