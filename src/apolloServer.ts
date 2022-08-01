import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { buildSchema } from 'type-graphql';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import AuthResolver from './auth/auth.resolver';
import UserResolver from './models/user/user.resolver';
import appContext from './utils/context/interface/context';
import UserbetResolver from './models/userBet/userBet.resolver';
import BetResolver from './models/bets/bets.resolver';

async function createApolloServer(httpServer: Server) {
  // Using TypeGraphQL, build GraphQL schema automatically
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AuthResolver,
      UserbetResolver,
      BetResolver,
    ],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Initialize the Apollo Server with the generated GraphQL schema
  return new ApolloServer({
    validationRules: [depthLimit(10)],
    schema,
    context: appContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
}

export default createApolloServer;
