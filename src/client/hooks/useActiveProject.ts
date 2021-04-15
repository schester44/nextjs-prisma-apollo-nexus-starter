import { useGetCurrentUserQuery } from "@client/graphql/types.generated";
import { useSession } from "next-auth/client";

export function useActiveProject() {
  const [session] = useSession();
  const [{ data: userData }] = useGetCurrentUserQuery();

  const activeProject = userData?.currentUser?.projects.find(
    //@ts-ignore - see nextauth callbacks
    ({ project }) => project.id === session?.currentProject
  );

  return activeProject;
}
