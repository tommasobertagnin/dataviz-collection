import fetch from 'isomorphic-fetch'

export const FETCH_INITIATED = 'FETCH_INITIATED'
export const FETCH_COMPLETED = 'FETCH_COMPLETED'

// export const fetchData = (url) => {
//   return dispatch => {
//     dispatch({ type: FETCH_INITIATED })
//     console.log('fetching:', url)
//     setTimeout(() => dispatch({ type: FETCH_COMPLETED }), 2000)
//   }
// }

export const fetchData = (url) => {
  return dispatch => {
    dispatch({ type: FETCH_INITIATED })
    console.log('fetching:', url)
    setTimeout(() => dispatch({ type: FETCH_COMPLETED }), 2000)
  }
}
