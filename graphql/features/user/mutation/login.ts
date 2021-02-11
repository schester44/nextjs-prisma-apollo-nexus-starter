import { mutationField, stringArg } from "nexus";
import bcrypt from "bcrypt";

import { Context } from "../../../../pages/api/graphql";
import { UserInputError } from "apollo-server-micro";

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  async resolve(root, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UserInputError("Invalid username and/or password");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UserInputError("Invalid username and/or password");
    // User is logged in... do something

    return true
  },
});
