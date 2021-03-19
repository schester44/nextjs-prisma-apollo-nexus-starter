import { getSession } from "next-auth/client";
import prisma from "src/db/prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

type User = {
  id: number;
  username: string;
};

export interface Context {
  user?: User;
  prisma: PrismaClient;
}

export async function createContext({ req }: { req: NextApiRequest }): Promise<Context> {
  // TODO: Implement Token Based Authentication (API Requests)
  const session = await getSession({ req });
  const user = session?.user as User | undefined;

  return { prisma, user };
}
