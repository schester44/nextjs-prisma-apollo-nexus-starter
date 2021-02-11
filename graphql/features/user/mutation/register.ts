import { mutationField, stringArg } from "nexus";
import bcrypt from "bcrypt";
import { Context } from "../../../../pages/api/graphql";
import { UserInputError } from "apollo-server-micro";

export const register = mutationField("register", {
  type: "Boolean",
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  async resolve(root, args, ctx: Context) {
    const existingUser = await ctx.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (existingUser) {
      throw new UserInputError("The username is already taken");
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    // TODO: Validate Email
    await ctx.prisma.user.create({
      data: {
        email: args.email,
        password: hashedPassword,
        company: {
          create: {
            name: args.email,
          },
        },
      },
    });

    return true;
  },
});
