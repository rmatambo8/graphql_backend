import * as types from '../constants/actionTypes';
export default (state = [], action) => {
  const {type, data} = action
  switch (type) {
    case types.GET_CART:
      return [...data]
    case types.ADD_ITEM:
      let index = state.findIndex(({ id }) => id === data.id);
      if (index > -1) {
        return state.map(cartItem => {
          if (cartItem.id === data.id) {
            return data
          }

          return cartItem
        })
      } 
      return [...state, data]
    case types.CHECKOUT:
      return []
    default:
      return state
  }
}

