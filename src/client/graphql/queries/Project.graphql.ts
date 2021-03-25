import { gql } from "urql";

export const projectQuery = gql`
  query getProjectQuery($id: String!) {
    project(id: $id) {
      id
      name
      isPaying
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
