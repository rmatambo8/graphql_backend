import * as types from '../constants/actionTypes'
import * as api from '../api';

// action creators - instead of payload i use data

export const getCart = () => {
  return async (dispatch) => {
    try {
      const data = await api.getCart()
      const action = { type: types.GET_CART, data };
      dispatch(action)
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const addToCart = (item) => {
  return async dispatch => {
    try {
      const data = await api.addProductToCart(item)
      const action = { type: types.ADD_ITEM, data };
      dispatch(action)
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const checkout = () => {
  return async (dispatch) => {
    try {
      const data = await api.checkout()
      const action = { type: types.CHECKOUT, data };
      dispatch(action)
    } catch (error) {
      console.log(error.message);
    }
  }
}