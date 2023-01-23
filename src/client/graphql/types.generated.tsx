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

export type Mutation = {
  __typename?: 'Mutation';
  changeSessionProject?: Maybe<Scalars['Boolean']>;
  changeSubscriptionPlan?: Maybe<Scalars['Boolean']>;
  createBillingPortalSession?: Maybe<Scalars['String']>;
  createCheckoutSession?: Maybe<Scalars['String']>;
  createProject?: Maybe<Project>;
  deleteProject?: Maybe<Scalars['Boolean']>;
  inviteUserToProject?: Maybe<Scalars['Boolean']>;
  updateProject?: Maybe<Project>;
};


export type MutationChangeSessionProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationChangeSubscriptionPlanArgs = {
  plan: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationCreateBillingPortalSessionArgs = {
  projectId: Scalars['String'];
};


export type MutationCreateCheckoutSessionArgs = {
  plan: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationInviteUserToProjectArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum PaidPlan {
  Advanced = 'advanced',
  Basic = 'basic',
  Pro = 'pro'
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  isPaying?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  subscriptions: Array<Subscription>;
  users: Array<ProjectUsers>;
};


export type ProjectSubscriptionsArgs = {
  after?: Maybe<SubscriptionWhereUniqueInput>;
  before?: Maybe<SubscriptionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProjectUsersArgs = {
  after?: Maybe<ProjectUsersWhereUniqueInput>;
  before?: Maybe<ProjectUsersWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum ProjectUserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type ProjectUsers = {
  __typename?: 'ProjectUsers';
  project: Project;
  role: ProjectUserRole;
  user: User;
};

export type ProjectUsersProjectIdUserIdCompoundUniqueInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type ProjectUsersWhereUniqueInput = {
  projectId_userId?: Maybe<ProjectUsersProjectIdUserIdCompoundUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  project?: Maybe<Project>;
  projectUsers?: Maybe<Array<Maybe<User>>>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryProjectUsersArgs = {
  projectId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  endDate: Scalars['DateTime'];
  externalProductId: Scalars['String'];
  id: Scalars['String'];
  planLevel?: Maybe<PaidPlan>;
};

export type SubscriptionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  projects: Array<ProjectUsers>;
};


export type UserProjectsArgs = {
  after?: Maybe<ProjectUsersWhereUniqueInput>;
  before?: Maybe<ProjectUsersWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserInvites = {
  __typename?: 'UserInvites';
  invitedBy: User;
  user: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CreateCheckoutSessionMutationVariables = Exact<{
  plan: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type CreateCheckoutSessionMutation = { __typename?: 'Mutation', createCheckoutSession?: string | null | undefined };

export type CreateBillingPortalSessionMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type CreateBillingPortalSessionMutation = { __typename?: 'Mutation', createBillingPortalSession?: string | null | undefined };

export type ChangeSubscriptionPlanMutationVariables = Exact<{
  projectId: Scalars['String'];
  plan: Scalars['String'];
}>;


export type ChangeSubscriptionPlanMutation = { __typename?: 'Mutation', changeSubscriptionPlan?: boolean | null | undefined };

export type InviteUserToProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type InviteUserToProjectMutation = { __typename?: 'Mutation', inviteUserToProject?: boolean | null | undefined };

export type ProjectUsersQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ProjectUsersQuery = { __typename?: 'Query', projectUsers?: Array<{ __typename?: 'User', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined> | null | undefined };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, name: string } | null | undefined };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, name: string } | null | undefined };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: boolean | null | undefined };

export type ChangeSessionProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ChangeSessionProjectMutation = { __typename?: 'Mutation', changeSessionProject?: boolean | null | undefined };

export type ProjectUsersQueryQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ProjectUsersQueryQuery = { __typename?: 'Query', projectUsers?: Array<{ __typename?: 'User', id: string, name?: string | null | undefined, email?: string | null | undefined } | null | undefined> | null | undefined };

export type GetProjectQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQueryQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, isPaying?: boolean | null | undefined, subscriptions: Array<{ __typename?: 'Subscription', externalProductId: string, planLevel?: PaidPlan | null | undefined, endDate: any }> } | null | undefined };

export type UserProjectsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQueryQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, name: string } | null | undefined> | null | undefined };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, name?: string | null | undefined, email?: string | null | undefined, projects: Array<{ __typename?: 'ProjectUsers', project: { __typename?: 'Project', id: string, name: string } }> } | null | undefined };


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
export const InviteUserToProjectDocument = gql`
    mutation inviteUserToProject($projectId: String!, $name: String!, $email: String!) {
  inviteUserToProject(projectId: $projectId, name: $name, email: $email)
}
    `;

export function useInviteUserToProjectMutation() {
  return Urql.useMutation<InviteUserToProjectMutation, InviteUserToProjectMutationVariables>(InviteUserToProjectDocument);
};
export const ProjectUsersDocument = gql`
    query projectUsers($projectId: String!) {
  projectUsers(projectId: $projectId) {
    id
    name
    email
  }
}
    `;

export function useProjectUsersQuery(options: Omit<Urql.UseQueryArgs<ProjectUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectUsersQuery>({ query: ProjectUsersDocument, ...options });
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
export const ProjectUsersQueryDocument = gql`
    query projectUsersQuery($projectId: String!) {
  projectUsers(projectId: $projectId) {
    id
    name
    email
  }
}
    `;

export function useProjectUsersQueryQuery(options: Omit<Urql.UseQueryArgs<ProjectUsersQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectUsersQueryQuery>({ query: ProjectUsersQueryDocument, ...options });
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