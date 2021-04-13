import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  projects?: Maybe<Array<Maybe<Project>>>;
  project?: Maybe<Project>;
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeSessionProject?: Maybe<Scalars['Boolean']>;
  createProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  deleteProject?: Maybe<Scalars['Boolean']>;
  changeSubscriptionPlan?: Maybe<Scalars['Boolean']>;
  createCheckoutSession?: Maybe<Scalars['String']>;
  createBillingPortalSession?: Maybe<Scalars['String']>;
};


export type MutationChangeSessionProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationChangeSubscriptionPlanArgs = {
  projectId: Scalars['String'];
  plan: Scalars['String'];
};


export type MutationCreateCheckoutSessionArgs = {
  projectId: Scalars['String'];
  plan: Scalars['String'];
};


export type MutationCreateBillingPortalSessionArgs = {
  projectId: Scalars['String'];
};

export type ProjectUsers = {
  __typename?: 'ProjectUsers';
  user: User;
  project: Project;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  projects: Array<ProjectUsers>;
};


export type UserProjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProjectUsersWhereUniqueInput>;
  after?: Maybe<ProjectUsersWhereUniqueInput>;
};

export enum PaidPlan {
  Basic = 'basic',
  Advanced = 'advanced',
  Pro = 'pro'
}

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['String'];
  endDate: Scalars['DateTime'];
  externalProductId: Scalars['String'];
  planLevel?: Maybe<PaidPlan>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  name: Scalars['String'];
  users: Array<ProjectUsers>;
  subscriptions: Array<Subscription>;
  isPaying?: Maybe<Scalars['Boolean']>;
};


export type ProjectUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProjectUsersWhereUniqueInput>;
  after?: Maybe<ProjectUsersWhereUniqueInput>;
};


export type ProjectSubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<SubscriptionWhereUniqueInput>;
  after?: Maybe<SubscriptionWhereUniqueInput>;
};

export type ProjectUsersWhereUniqueInput = {
  projectId_userId?: Maybe<ProjectUsersProjectIdUserIdCompoundUniqueInput>;
};


export type SubscriptionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ProjectUsersProjectIdUserIdCompoundUniqueInput = {
  projectId: Scalars['String'];
  userId: Scalars['Int'];
};

export type CreateCheckoutSessionMutationVariables = Exact<{
  plan: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type CreateCheckoutSessionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createCheckoutSession'>
);

export type CreateBillingPortalSessionMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type CreateBillingPortalSessionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createBillingPortalSession'>
);

export type ChangeSubscriptionPlanMutationVariables = Exact<{
  projectId: Scalars['String'];
  plan: Scalars['String'];
}>;


export type ChangeSubscriptionPlanMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeSubscriptionPlan'>
);

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  )> }
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type ChangeSessionProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ChangeSessionProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeSessionProject'>
);

export type GetProjectQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQueryQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isPaying'>
    & { subscriptions: Array<(
      { __typename?: 'Subscription' }
      & Pick<Subscription, 'externalProductId' | 'planLevel' | 'endDate'>
    )> }
  )> }
);

export type UserProjectsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQueryQuery = (
  { __typename?: 'Query' }
  & { projects?: Maybe<Array<Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  )>>> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { projects: Array<(
      { __typename?: 'ProjectUsers' }
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      ) }
    )> }
  )> }
);


export const CreateCheckoutSessionDocument = gql`
    mutation createCheckoutSession($plan: String!, $projectId: String!) {
  createCheckoutSession(plan: $plan, projectId: $projectId)
}
    `;

export function useCreateCheckoutSessionMutation() {
  return Urql.useMutation<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>(CreateCheckoutSessionDocument);
};
export const CreateBillingPortalSessionDocument = gql`
    mutation createBillingPortalSession($projectId: String!) {
  createBillingPortalSession(projectId: $projectId)
}
    `;

export function useCreateBillingPortalSessionMutation() {
  return Urql.useMutation<CreateBillingPortalSessionMutation, CreateBillingPortalSessionMutationVariables>(CreateBillingPortalSessionDocument);
};
export const ChangeSubscriptionPlanDocument = gql`
    mutation changeSubscriptionPlan($projectId: String!, $plan: String!) {
  changeSubscriptionPlan(projectId: $projectId, plan: $plan)
}
    `;

export function useChangeSubscriptionPlanMutation() {
  return Urql.useMutation<ChangeSubscriptionPlanMutation, ChangeSubscriptionPlanMutationVariables>(ChangeSubscriptionPlanDocument);
};
export const CreateProjectDocument = gql`
    mutation createProject($name: String!) {
  createProject(name: $name) {
    id
    name
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const UpdateProjectDocument = gql`
    mutation updateProject($id: String!, $name: String!) {
  updateProject(id: $id, name: $name) {
    id
    name
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: String!) {
  deleteProject(id: $id)
}
    `;

export function useDeleteProjectMutation() {
  return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
};
export const ChangeSessionProjectDocument = gql`
    mutation changeSessionProject($projectId: String!) {
  changeSessionProject(projectId: $projectId)
}
    `;

export function useChangeSessionProjectMutation() {
  return Urql.useMutation<ChangeSessionProjectMutation, ChangeSessionProjectMutationVariables>(ChangeSessionProjectDocument);
};
export const GetProjectQueryDocument = gql`
    query getProjectQuery($id: String!) {
  project(id: $id) {
    id
    name
    isPaying
    subscriptions {
      externalProductId
      planLevel
      endDate
    }
  }
}
    `;

export function useGetProjectQueryQuery(options: Omit<Urql.UseQueryArgs<GetProjectQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProjectQueryQuery>({ query: GetProjectQueryDocument, ...options });
};
export const UserProjectsQueryDocument = gql`
    query userProjectsQuery {
  projects {
    id
    name
  }
}
    `;

export function useUserProjectsQueryQuery(options: Omit<Urql.UseQueryArgs<UserProjectsQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserProjectsQueryQuery>({ query: UserProjectsQueryDocument, ...options });
};
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
    name
    email
    projects {
      project {
        id
        name
      }
    }
  }
}
    `;

export function useGetCurrentUserQuery(options: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCurrentUserQuery>({ query: GetCurrentUserDocument, ...options });
};