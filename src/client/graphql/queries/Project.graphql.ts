import { gql } from "urql";

export const projectUsersQuery = gql`
  query projectUsersQuery($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      name
      email
    }
  }
`;

export const projectQuery = gql`
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

export const userProjectsQuery = gql`
  query userProjectsQuery {
    projects {
      id
      name
    }
  }
`;
