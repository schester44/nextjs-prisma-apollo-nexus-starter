import NextAuth, { Session, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "src/db/prisma/client";
import { JWT } from "next-auth/jwt";
import moniker from "moniker";

async function generateProjectAndAssignToUser(user: User) {
  const names = moniker.generator([moniker.adjective, moniker.noun], { glue: " " });

  const project = await prisma.project.create({
    data: {
      name: names.choose(),
    },
  });

  await prisma.projectUsers.create({
    data: {
      projectId: project.id,
      userId: user.id,
      role: "ADMIN",
    },
  });

  return project;
}

export default NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ user, session }) {
      session.user.id = user.id;

      return Promise.resolve(session);
    },
  },
  // Configure one or more authentication providers #ref https://next-auth.js.org/providers/email
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  // DB Adapter #ref https://next-auth.js.org/schemas/adapters#prisma-adapter
  adapter: PrismaAdapter(prisma),
});
