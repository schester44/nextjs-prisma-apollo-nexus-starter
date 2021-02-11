// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";

type User = {
  id: string;
  username: string;
};

export interface Context {
  user?: User;
  prisma: PrismaClient;
}

const apolloServer = new ApolloServer({
  schema,
  context: (): Context => {
    return { prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({
  path: "/api/graphql",
});
