export const BASE_URL = "/graphql";

export const GET_CART =`
query {
	cartItems {
    id
		title
    price
    quantity
    productId
  }
}
`

export const ADD_CART_ITEM = `
mutation addCartItem($productId: String!, $quantity: Int!) {
  addCartItem(productId: $productId, quantity: $quantity) {
    id
    title
    price
    quantity
    productId
  }
}
`

export const ADD_PRODUCT =`
mutation addProduct($title: String!, $quantity: Int!, $price: Int!) {
  addProduct(title: $title, quantity: $quantity, price: $price) {
    id
    title
    price
    quantity
  }
}
`

export const UPDATE_PRODUCT =`
mutation updateProduct($id: String!, $title: String, $quantity: Int, $price: Int) {
  updateProduct(id: $id, title: $title, quantity: $quantity, price: $price) {
    id
    title
    price
    quantity
  }
}
`

export const GET_PRODUCTS = `
query {
	products {
    id
		title
    price
    quantity
  }
}
`

export const DELETE_PRODUCT =`
mutation ($id: String!) {
  removeProduct(id: $id) {
    nullable
  }
}
`

export const CHECKOUT = `
mutation {
  checkout{
    quantity
  }
}
`
