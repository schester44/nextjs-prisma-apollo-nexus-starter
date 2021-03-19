import { gql } from "urql";

export const userProjectsQuery = gql`
  query userProjectsQuery {
    projects {
      id
      name
    }
  }
`;
