import { gql } from "urql";

export const changeSessionProject = gql`
  mutation changeSessionProject($projectId: String!) {
    changeSessionProject(projectId: $projectId)
  }
`;

export const inviteMembersToProject = gql`
  mutation inviteMembersToProject($emails: [String]!, $role: UserRole!) {
    inviteMembersToProject(emails: $emails, role: $role)
  }
`;
