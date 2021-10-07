import { gql } from "urql";

export const changeSessionProject = gql`
  mutation changeSessionProject($projectId: String!) {
    changeSessionProject(projectId: $projectId)
  }
`;
