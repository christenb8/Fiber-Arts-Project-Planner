// index.js is the entry point of your backend application.
// It sets up the Express server, connects to the MongoDB database,
// and configures the Apollo GraphQL server.


/*

//this is calling all the libraries and APIs we will be using
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Import your MongoDB connection URI from the config file.
const { MONGODB_URI } = require('./config');

// Import the GraphQL schema definitions and resolvers.
const typeDefs = require('./graphql/TypeDefs');
const resolvers = require('./graphql/resolvers');

// Initialize the Express and Apollo Server instances.
// Then start the server with a function


*/
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const { mongoURI, port } = require('./config');

const typeDefs = require('./graphql/TypeDefs');
const resolvers = require('./graphql/resolvers');  

const app = express();

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Set up Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    }
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();