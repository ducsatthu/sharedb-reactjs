/* 
  src/reducers/socketReducer.js
*/
export default (state = {}, action) => {
  switch (action.type) {
    case 'SOCKET_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
