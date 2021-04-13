import Stripe from "stripe";

export * from "./plans";

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2020-08-27",
});
