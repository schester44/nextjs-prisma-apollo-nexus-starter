import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "@server/services/stripe";
import Stripe from "stripe";
import prisma from "@db/prisma/client";
import { addDays } from "date-fns";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const plan = await prisma.subscriptionPlan.findFirst({
          where: {
            externalProductId: session.line_items?.data[0].id,
          },
        });

        if (!plan) {
          // FIXME: LOG AN ERROR..THIS SHOULD NEVER OCCUR
        }

        console.log("CREATE THE SUBSCRIPTION", session.subscription);

        await prisma.subscription.create({
          data: {
            projectId: session.client_reference_id as string,
            externalId: session.subscription as string,
            planId: plan?.id as string,
            startDate: new Date(),
            // FIXME: This assumes monthly billing
            endDate: addDays(new Date(), 30),
          },
        });
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);

        break;
      }
      case "payment_indent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
        break;
      }
      case "change.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);
      }
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
