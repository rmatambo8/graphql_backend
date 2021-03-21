import mongoose from 'mongoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


import RootQueryType from "./models/queryTypes.js"
import RootMutationType from "./models/mutationTypes.js";
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})


const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('server Running on port: ', PORT))