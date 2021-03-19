import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/server/graphql/schema";
import { createContext } from "src/server/graphql/context";

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({
  path: "/api/graphql",
});
