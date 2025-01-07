const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
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

  // Start Apollo Server
  await server.start(); // Ensure this happens before applying middleware

  // Apply Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Log the GraphQL playground URL
  console.log(`🚀 GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`);
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
  // Start Apollo Server before the Express app starts listening
  await startApolloServer(); 

  // After Apollo Server starts, listen for incoming requests on the given port
  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
  });
});

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
