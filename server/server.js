// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');
// const { ApolloServer } = require('apollo-server-express');
// const typeDefs = require('./schemas/typedefs');
// const resolvers = require('./schemas/resolvers');


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req}) => ({ token: req.headers.authorization })
// });

// server.start().then(() => { 
//   server.applyMiddleware({ app });
// });

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// Initialize Apollo Server with type definitions, resolvers, and context
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // Use authMiddleware to handle authentication
  });

  await server.start(); // Start Apollo Server
  server.applyMiddleware({ app }); // Integrate Apollo Server with Express
};

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Initialize database and start server
db.once('open', async () => {
  await startApolloServer(); // Start Apollo Server before listening for requests
  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});