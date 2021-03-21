import { graphql, GraphQLInputObjectType, GraphQLInt, GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import Product from "./product.js";
import CartItem from "./cartItem.js";
import { CartItemType, ProductType } from "./queryTypes.js";
// let {products, cartItems} = data
export const productFields = {
  addProduct: {
    type: ProductType,
    description: "Add a product to the database",
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) },
      quantity: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
      const product = await Product.create({...args})
      return product
    }
  },
  updateProduct: {
    type: ProductType,
    description: "Update a product in the database",
    args: {
      id: {type: GraphQLNonNull(GraphQLString)},
      title: { type: GraphQLString },
      price: { type: GraphQLInt},
      quantity: { type: GraphQLInt}
    },
    resolve: async (_, args) => {
      const {id, title, price, quantity} = args
      const product = await Product.findById(args.id)
      const updatedProduct = await Product.findByIdAndUpdate(args.id, {
        title: title || product.title,
        price: price === undefined ? product.price : price,
        quantity: quantity === undefined ? product.quantity : quantity,
      },
        { new: true });
      
      const updatedCartItem = await CartItem.findOneAndUpdate(
            { productId: updatedProduct.id },
            { title: updatedProduct.title, price: updatedProduct.price },
        { new: true });
      
      return updatedProduct;
    }
  },
  removeProduct: {
    type: ProductType,
    description: "remove a single Product",
    args: {
      id: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve: async (_, args) => {
      const productId = args.id
      let res = await Product.findByIdAndRemove(productId)
      try {
        await CartItem.deleteMany({ productId })
      } catch (error) {
        console.log(error)
      }
      return res
    }
  }
}

export const cartItemFields = {
  addCartItem: {
    type: CartItemType,
    description: "Add a cartItem to the database",
    args: {
      productId: {type: GraphQLNonNull(GraphQLString)},
      title: { type: GraphQLString},
      price: {type: GraphQLInt},
      quantity: {type: GraphQLInt},
    },
    resolve: async (parent, args) => {
      const { productId } = args;
      const product = { ...args };
      product.productId = undefined;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId, { quantity: product.quantity - 1 }, { new: true }
      )
      let item = await CartItem.findOne({
        productId: productId
      })
      if (!item) {
        item = await CartItem.create({
          title: updatedProduct.title,
          price: updatedProduct.price,
          quantity: 1,
          productId
        })
      } else {
        item = await CartItem.findOneAndUpdate(
          { productId: updatedProduct.id },
          { quantity: item.quantity + 1 },
          { new: true }
        );
      }

      return item;
    }
  },
  updateCartItem: {
    type: CartItemType,
    description: "Update an existing cartItem in the database",
    args: {
      id: {type: GraphQLNonNull(GraphQLString)},
      title: { type: GraphQLString },
      price: { type: GraphQLInt },
      quantity: { type: GraphQLInt },
      productId: {type: GraphQLString}
    },
    resolve: async (parent, args) => {
      const {id, title, price, quantity, productId} = args
      const cartItem = await CartItem.findById(args.id)

      let item = await CartItem.findOneAndUpdate(
        { id },
        {
          title: title || product.title,
          price: price === undefined ? cartItem.price : price,
          quantity: quantity === undefined ? cartItem.quantity : quantity,
          productId: productId || cartItems.productId
        },
        { new: true }
      );
      return item
    }
  },
  removeCartItem: {
    type: CartItemType,
    description: "removing an item from the cart based on it's productId",
    args: {
      productId: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve: async (_, args) => {
      const response = await CartItem.deleteMany({ productId: args.productId})
      return response
    } 
  },
  checkout: {
    type: CartItemType,
    description: "remove all items from the cart",
    resolve: async () => {
      await CartItem.deleteMany({})
      return []
    }
  }

}