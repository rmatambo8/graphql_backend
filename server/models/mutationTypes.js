import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { ProductType, CartItemType } from './queryTypes.js';
import { productFields, cartItemFields } from './mutationField.js';
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation Type",
  fields: () => ({...productFields, ...cartItemFields  })
})

export default RootMutationType