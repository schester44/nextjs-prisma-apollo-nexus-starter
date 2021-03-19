import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "src/db/prisma/client";
import { JWT } from "next-auth/jwt";

const emailServerConfig = {
  host: process.env.EMAIL_SERVER_HOST || "",
  port: Number(process.env.EMAIL_SERVER_PORT || 587),
  auth: {
    user: process.env.EMAIL_SERVER_USER || "",
    pass: process.env.EMAIL_SERVER_PASSWORD || "",
  },
};

export default NextAuth({
  callbacks: {
    // FIXME:
    //@ts-ignore
    jwt(token: JWT, user: User & { id: number }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    // FIXME:
    //@ts-ignore
    async session(session, user: User & { id: number }) {
      session.user.id = user.id;

      return Promise.resolve(session);
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  // Configure one or more authentication providers #ref https://next-auth.js.org/providers/email
  providers: [
    Providers.Email({
      server: emailServerConfig,
      from: process.env.EMAIL_FROM,
    }),
  ],
  // DB Adapter #ref https://next-auth.js.org/schemas/adapters#prisma-adapter
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
