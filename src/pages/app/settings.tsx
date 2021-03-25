import Button from "@client/components/dashboard/Button";
import Layout from "@client/components/dashboard/Layout";
import {
  PaidPlan,
  useCreateBillingPortalSessionMutation,
  useCreateCheckoutSessionMutation,
} from "@client/graphql/types.generated";
import { Project } from "@prisma/client";
import { getSessionProject } from "src/server/session";
import { loadStripe } from "@stripe/stripe-js";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import prisma from "src/db/prisma/client";
import CreateProjectModal from "@client/components/dashboard/CreateProjectModal";

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

function UpgradeButton({ children, projectId }: { children: React.ReactNode; projectId: string }) {
  const [, createCheckoutSession] = useCreateCheckoutSessionMutation();

  function redirectToCheckout() {
    Promise.all([
      loadStripe(
        "pk_test_51IWaHAFekyIaHSTbkno4T5JtZWlUWEBFe8EMycXFCR0aLz1xf8r6xUMVQzPiCL3Nczuff27ZCYuEH1Cl9HqC9w9t00JcjsiI15"
      ),
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

const settings = ({ isPaying, project }: { isPaying: boolean; project: Project | undefined }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!project) router.push("/app");
  }, [project]);

  if (!project) return <CreateProjectModal onClose={console.log} />;

  return (
    <Layout activeProject={project}>
      <h1 className="text-3xl p-4 font-semibold"> Settings page for {project.name}</h1>

      <div className="pt-8">
        {!isPaying && <UpgradeButton projectId={project.id}>Upgrade</UpgradeButton>}
        {isPaying && <BillingButton projectId={project.id}>Billing</BillingButton>}
      </div>

      <div className="pt-8">
        <h1 className="text-3xl p-4 font-semibold">Upgrade Plan</h1>

        <Button>Basic</Button>
        <Button>Advanced</Button>
        <Button>Pro</Button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req }: NextPageContext) {
  const userProject = await getSessionProject(req);

  let isPaying = false;

  if (userProject) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        projectId: userProject.projectId,
      },
    });

    isPaying = !!subscription;
  }

  return {
    props: {
      isPaying,
      project: userProject?.project || null,
    },
  };
}

export default settings;
