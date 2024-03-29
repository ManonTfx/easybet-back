import 'reflect-metadata';
import { ApolloError } from 'apollo-server-errors';
import { createServer } from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { log } from './utils/logger/logger';
import createApolloServer from './apolloServer';

// Initialize Express and middlewares

async function startServer() {
  // Get environments variables from .env file
  dotenv.config();
  // Initialize server port
  const PORT = +process.env.PORT! || 4000;
  const app = express();

  app.use(cookieParser()); // Cookie Parser middleware to read cookies from the navigator
  app.use(compression()); // Compress all responses for better performance

  // Basic rate limiter to prevent DDOS attacks
  const rateLimiter = rateLimit({
    windowMs: 10 * 1000, // ten seconds
    max: 50, // limit each IP address to 50 requests / 10 seconds
    message: {
      message: 'Too many requests, please try again later.',
      status: 429,
    },
  });

  // Setup the server endpoint to ${serverAdress}/graphql with the rate limiter
  app.use('/graphql', rateLimiter);
  app.use(express.json()); // Body parser

  app.use(cors());

  const httpServer = createServer(app);
  // Using TypeGraphQL, build GraphQL schema automatically
  const server = await createApolloServer(httpServer);
  // * Startup server
  try {
    await server.start();
    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: [
          process.env.FRONTEND_URL || 'https://easybet.site',
          // TODO: remove development endpoints once the app is ready for production
          'https://studio.apollographql.com',
        ],
      },
    });

    httpServer.listen(PORT, () => {
      log.info('Server ready', { port: PORT });
    });
  } catch (error) {
    throw new ApolloError('An error happened', undefined, { error });
  }
}

startServer();
