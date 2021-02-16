// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/client";

type User = {
  id: number;
  username: string;
};

export interface Context {
  user?: User;
  prisma: PrismaClient;
}

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context> => {
    // TODO: Implement Token Based Authentication (API Requests)

    const session = await getSession({ req });
    const user = session?.user;

    return { prisma, user };
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
