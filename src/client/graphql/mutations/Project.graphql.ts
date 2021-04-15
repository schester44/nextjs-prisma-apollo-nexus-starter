import { gql } from "urql";

export const projectUsers = gql`
  query projectUsers($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      name
      email
    }
  }
`;

export const createProjectMutation = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`;

export const updateProjectMutation = gql`
  mutation updateProject($id: String!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const deleteProjectMutation = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id)
  }
`;
