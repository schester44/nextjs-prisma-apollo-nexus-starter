import { makeSchema, fieldAuthorizePlugin, queryType, mutationType } from "nexus";
import path from "path";
import { nexusPrisma } from "nexus-plugin-prisma";

import * as User from "./User";
import * as Project from "./Project";

const Mutation = mutationType({
  definition(t) {},
});

const Query = queryType({
  definition(t) {},
});

const resolvers = { Query, Mutation, ...User, ...Project };

const outputPath = path.join(process.cwd(), "src", "server", "graphql");

export const schema = makeSchema({
  outputs: {
    typegen: path.join(outputPath, "nexus-typegen.ts"),
    schema: path.join(outputPath, "schema.graphql"),
  },
  types: { resolvers },
  plugins: [fieldAuthorizePlugin(), nexusPrisma()],
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
      {
        module: path.join(outputPath, "context.ts"),
        alias: "Context",
      },
    ],
  },
});
