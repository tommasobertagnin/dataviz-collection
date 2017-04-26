import {
  FETCH_INITIATED,
  FETCH_COMPLETED,
  FETCH_ERROR,
  DATA_RECEIVED,
} from '../actions/appState'

const defaultAppState = {
  isFetching: true,
  data: null,
  cachedData: {},
  error: null,
}

const appState = (state = defaultAppState, action) => {
  switch (action.type) {
  case FETCH_INITIATED:
    return {
      ...state,
      isFetching: true,
      data: defaultAppState.data,
    }
  
  case FETCH_COMPLETED:
    return {
      ...state,
      isFetching: false
    }
  
  case FETCH_ERROR:
    return {
      ...state,
      error: action.error
    }
  
  case DATA_RECEIVED:
    return {
      ...state,
      data: action.data
    }
  
  default:
    return state
  }
}

export default appState
