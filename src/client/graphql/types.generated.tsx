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
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  user?: Maybe<User>;
  projects?: Maybe<Array<Maybe<Project>>>;
  project?: Maybe<Project>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  deleteProject?: Maybe<Scalars['Boolean']>;
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
  Pro = 'pro'
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ProjectUsersWhereUniqueInput = {
  projectId_userId?: Maybe<ProjectUsersProjectIdUserIdCompoundUniqueInput>;
};

export type ProjectUsersProjectIdUserIdCompoundUniqueInput = {
  projectId: Scalars['String'];
  userId: Scalars['Int'];
};

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

export type GetProjectQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQueryQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
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
export const GetProjectQueryDocument = gql`
    query getProjectQuery($id: String!) {
  project(id: $id) {
    id
    name
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