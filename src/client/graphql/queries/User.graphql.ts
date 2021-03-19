import { gql } from "urql";

export const currentUserQuery = gql`
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
