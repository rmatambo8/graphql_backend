
import axios from 'axios'
import * as constants from '../constants/graphQLconstants.js';
const queryAxios = async (query, variables) => {
  const {data} =  await axios.post('graphql', {
      query,
      variables
    }
  )
  return data.data
}
/*
example response for get cart
  {
    "data": {
      "cartItems": [
        {
          "id": "605771f4f594cf118915f5b8",
          "title": "ezra has been graphql'd",
          "price": 1,
          "quantity": 2,
          "productId": "605766e3dfc22a09c33817bf"
        }
      ]
    }
  }
  */

export const getCart = async () => {
  const { cartItems } = await queryAxios(constants.GET_CART)
  return cartItems

}

export const addProductToCart = async (item) => {
  const { addCartItem } = await queryAxios(constants.ADD_CART_ITEM, {
    productId: item.id,
    ...item
  });
  return addCartItem;
}



export const getProducts = async () => {
  const { products } = await queryAxios(constants.GET_PRODUCTS);
  return products;
}

export const addProduct = async (product) => {
  const { addProduct: newProduct } = await queryAxios(constants.ADD_PRODUCT, product);
  return newProduct;
}

export const updateProduct = async (product) => {
  let { updateProduct: updatedProduct } = await queryAxios(constants.UPDATE_PRODUCT, product);  
  return updatedProduct;
}

export const deleteProduct = async (id) => {
  const {removeProduct} = await queryAxios(constants.DELETE_PRODUCT, { id });
  return removeProduct;
  
}

export const checkout = async () => {
  const data = await queryAxios(constants.CHECKOUT);
  return data
}
