
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from 'mongoose';

const MONGODB_KEY = process.env.MONGODB_KEY ?? '';
async function connect() {
    try {
        await mongoose.connect(MONGODB_KEY)
    } catch (error) {
        console.error('Error connecting to mongodb')
    }
}

connect();

const Schema = mongoose.Schema;
const User = new Schema({
    username: String,
    password: String,
    email: String,

})

export const UserModel = mongoose.model('User', User);

const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        password: String!
        email: String!
    }
    
    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    `

    const resolvers = {
        Query: {
            users: async () => {
                return await UserModel.find();
            },
            user: async (_: any, args: any) => {
                return await UserModel.findById(args.id);
            }
        }
    }


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
