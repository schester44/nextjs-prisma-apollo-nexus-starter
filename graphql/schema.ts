import { makeSchema, fieldAuthorizePlugin } from "nexus";

import { Query } from "./Query";
import { User } from "./features/user";
import { Company } from "./features/company";

export const resolvers = [Query, User, Company];

export const schema = makeSchema({
  types: { resolvers },
  plugins: [fieldAuthorizePlugin()],
});
