import * as types from '../constants/actionTypes';
import * as api from '../api';

// action creators - instead of payload i use data

export const getProducts = () => {
  return async dispatch => {
    try {
      const data = await api.getProducts();
      const action = { type: types.GET_PRODUCTS, data };
      dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const addProduct = (item) => {
  return async (dispatch) => {
    try {
      const data = await api.addProduct(item);
      const action = { type: types.ADD_PRODUCT, data };
      await dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const updateProduct = (item) => {
  return async (dispatch) => {
    try {
      const data = await api.updateProduct(item);
      const action = { type: types.UPDATE_PRODUCT, data };
      await dispatch(action);      
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const data = await api.deleteProduct(id)
      const action = { type: types.DELETE_PRODUCT, data: { id } };
      dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  }
}