import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql'
import data from '../data/dummy.js'
import Product from './product.js'
import CartItem from './cartItem.js'

export const CartItemType = new GraphQLObjectType({
  name: "CartItem",
  description: "This represents a Cart Item with a product id",
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLString)},
    title: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    quantity: { type: GraphQLInt },
    nullable: { type: GraphQLBoolean},
    product: {
      type: ProductType,
      resolve: async ({productId}) => {
        const item = await Product.findById(productId)
        return item
      }
    },
    productId: { type: GraphQLNonNull(GraphQLString) }
  })
})

export const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "This represents a product",
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLString)},
    title: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
    nullable: { type: GraphQLBoolean},
    cartItems: {
      type: new GraphQLList(CartItemType),
      resolve: async ({ id }) => {
        //id is the original product's id
        const item = await CartItem.findOne({ productId: id })
        return item
      } 
    }
  })
})
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    cartItem: {
      type: CartItemType,
      description: "A single cart item",
      args: {
        id: {type: GraphQLString}
      },
      resolve: async (_, args) => {
        const item = await CartItem.findById(args.id)
        return item
      }
    },
    cartItems: {
      type: new GraphQLList(CartItemType),
      description: "List of all cart items",
      resolve: async () => {
        const cart = await CartItem.find({})
        return cart
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      description: "list of all products",
      resolve: async () => {
        const products = await Product.find({})
        return products
      }
    },
    product: {
      type: ProductType,
      description: "a single products",
      args: {
        id: {type: GraphQLString}
      },
      resolve: async (_, args) => {
        const product = await Product.findById(args.id)
        return product
      }
    }
  })
})

export default RootQueryType;