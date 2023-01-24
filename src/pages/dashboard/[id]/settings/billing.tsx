import Button from "@client/components/dashboard/Button";
import Layout from "@client/components/dashboard/Layout";
import {
  PaidPlan,
  Subscription,
  useChangeSubscriptionPlanMutation,
  useCreateBillingPortalSessionMutation,
  useCreateCheckoutSessionMutation,
} from "@client/graphql/types.generated";
import { Project } from "@prisma/client";
import { getActiveProject } from "src/server/session";
import { loadStripe } from "@stripe/stripe-js";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import prisma from "src/db/prisma/client";
import { plans } from "@server/services/stripe/plans";
import { getSession } from "next-auth/react";

function BillingButton({ children, projectId }: { children: React.ReactNode; projectId: string }) {
  const [, createPortalSession] = useCreateBillingPortalSessionMutation();

  function redirectToCheckout() {
    createPortalSession({ projectId }).then(({ data }) => {
      if (data?.createBillingPortalSession) {
        window.location.href = data.createBillingPortalSession;
      }
    });
  }

  return (
    <Button type="primary" onClick={redirectToCheckout}>
      {children}
    </Button>
  );
}

function SubscribeButton({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) {
  const [, createCheckoutSession] = useCreateCheckoutSessionMutation();

  function redirectToCheckout() {
    Promise.all([
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string),
      createCheckoutSession({ plan: PaidPlan.Pro, projectId }).then(
        ({ data }) => data?.createCheckoutSession
      ),
    ]).then(([stripe, sessionId]) => {
      if (!stripe || !sessionId) return;

      stripe.redirectToCheckout({ sessionId });
    });
  }

  return (
    <Button type="primary" onClick={redirectToCheckout}>
      {children}
    </Button>
  );
}

const settings = ({
  subscription,
  project,
}: {
  subscription: string | undefined;
  project: Project | undefined;
}) => {
  const router = useRouter();
  const [, changeSubscription] = useChangeSubscriptionPlanMutation();

  React.useEffect(() => {
    if (!project) router.push("/app");
  }, [project]);

  function handleSubscriptionChange(plan: string) {
    if (!project) return false;

    changeSubscription({
      plan,
      projectId: project?.id,
    }).then(({ data }) => {
      console.log(data);
    });
  }

  if (!project) return null;

  const sub: Subscription | undefined = subscription ? JSON.parse(subscription) : undefined;
  const isActive = new Date(sub?.endDate) >= new Date();

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-3">
          <h1 className="text-2xl font-bold mt-4">Billing</h1>
          <p className="text-sm text-gray-600">Billing & plan details for {project.name}</p>
        </div>

        <div className="pt-8">
          {!isActive && <SubscribeButton projectId={project.id}>Upgrade</SubscribeButton>}
          {isActive && <BillingButton projectId={project.id}>Billing</BillingButton>}
        </div>

        <div className="pt-8">
          <h1 className="text-3xl p-4 font-semibold">Upgrade Plan</h1>

          <div>
            {Object.keys(plans).map((name) => {
              const price = plans[name as keyof typeof plans];
              const isSelected = sub?.externalProductId === price;

              return (
                <Button
                  key={name}
                  type={isSelected ? "primary" : "secondary"}
                  className="mx-1 capitalize"
                  onClick={() => handleSubscriptionChange(name)}
                >
                  {name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function replacer(_: any, value: any) {
  //@ts-ignore
  if (typeof value === "Date") {
    return value.toString();
  }
  return value;
}

export async function getServerSideProps({ req, query }: NextPageContext) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const activeProject = await getActiveProject(session?.user.id, query);

  let subscription;

  if (activeProject) {
    subscription = await prisma.subscription.findFirst({
      where: {
        projectId: activeProject.id,
      },
    });
  }

  return {
    props: {
      subscription: JSON.stringify(subscription, replacer),
      project: activeProject,
    },
  };
}

export default settings;
