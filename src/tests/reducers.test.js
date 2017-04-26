/* global describe, test, expect */
import configureStore from '../store/configureStore'
const store = configureStore()

describe('REDUCERS TESTS:', () => {
  test('getState() returns a state object', () => {
    expect(typeof store.getState()).toBe('object')
  })

  test('the state object contains the initial appState', () => {
    expect(store.getState()).toEqual(expect.objectContaining({
      appState: expect.any(Object)
    }))
  })
})
