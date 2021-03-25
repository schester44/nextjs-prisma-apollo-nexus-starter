import Stripe from "stripe";

export * from "./plans";

export const stripe = new Stripe(
  "sk_test_51IWaHAFekyIaHSTbyPvhrM4CaNDVIS7iZtPzdOs293ONNnY5UzTxrckjPvISMMrtHtAlexOpOkw333IEDeabZoUw00m30B8gdx",
  {
    apiVersion: "2020-08-27",
  }
);
