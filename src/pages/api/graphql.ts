import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/server/graphql/schema";
import { createContext } from "src/server/graphql/context";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";

const server = new ApolloServer({
  schema,
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
