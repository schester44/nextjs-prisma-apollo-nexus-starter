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
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
};


export type MutationCreateProjectArgs = {
  projectName: Scalars['String'];
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