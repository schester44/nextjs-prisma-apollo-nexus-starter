import { getSession } from "next-auth/client";
import prisma from "src/db/prisma/client";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest } from "next";
import { Session } from "next-auth";

export interface Context {
  user?: Pick<User, "id" | "email" | "name">;
  prisma: PrismaClient;
  session: Session | null;
}

export type AuthenticatedUserContext = Context & {
  user: Pick<User, "id" | "email" | "name">;
};

export async function createContext({ req }: { req: NextApiRequest }): Promise<Context> {
  // TODO: Implement Token Based Authentication (API Requests)
  const session = await getSession({ req });
  const user = session?.user as User | undefined;

  return { prisma, user, session };
}
