import { Context } from "./context";

export const isAuthenticated = (_root: any, _args: any, ctx: Context) => {
  return !!ctx.user && !!ctx.session;
};
