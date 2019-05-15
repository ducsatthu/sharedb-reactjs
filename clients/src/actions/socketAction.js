/* 
  src/actions/socketAction.js
*/
export const socketAction = () => dispatch => {
  dispatch({
    type: 'SOCKET_ACTION',
    payload: 'listen data change'
  })
}
