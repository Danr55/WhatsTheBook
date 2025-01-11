const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas'); // Assuming these files are in the 'schemas' directory

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whats-the-book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () =>
  console.log(`Server running at http://localhost:3001${server.graphqlPath}`)
);