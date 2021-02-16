import { makeSchema, fieldAuthorizePlugin } from "nexus";

import { Query } from "./Query";
import { User } from "./features/user";
import { Company } from "./features/company";
import { Mutation } from "./Mutation";
import { Project } from "./features/projects";

export const resolvers = [Query, Mutation, User, Company, Project];

export const schema = makeSchema({
  types: { resolvers },
  plugins: [fieldAuthorizePlugin()],
});
