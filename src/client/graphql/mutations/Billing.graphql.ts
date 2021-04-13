import { gql } from "urql";

export const createCheckoutSessionMutation = gql`
  mutation createCheckoutSession($plan: String!, $projectId: String!) {
    createCheckoutSession(plan: $plan, projectId: $projectId)
  }
`;

export const createBillingPortalSessionMutation = gql`
  mutation createBillingPortalSession($projectId: String!) {
    createBillingPortalSession(projectId: $projectId)
  }
`;

export const changeSubscriptionPlan = gql`
  mutation changeSubscriptionPlan($projectId: String!, $plan: String!) {
    changeSubscriptionPlan(projectId: $projectId, plan: $plan)
  }
`;
