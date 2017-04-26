import fetch from 'isomorphic-fetch'

export const FETCH_INITIATED = 'FETCH_INITIATED'
export const FETCH_COMPLETED = 'FETCH_COMPLETED'
export const FETCH_ERROR = 'FETCH_ERROR'
export const DATA_RECEIVED = 'DATA_RECEIVED'

export const fetchData = (url) => {
  return (dispatch) => {
    dispatch({ type: FETCH_INITIATED, url })

    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: DATA_RECEIVED, data, url })
        dispatch({ type: FETCH_COMPLETED, url })
      })
      .catch(error => dispatch({ type: FETCH_ERROR, error, url }))
  }
}
