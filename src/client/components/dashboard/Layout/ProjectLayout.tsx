import { Project } from "@prisma/client";
import Link from "next/link";
import { ReactNode } from "react";
import Layout from ".";

export function ProjectLayout({ project, children }: { children: ReactNode; project: Project }) {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="p-2 border-r h-full w-[200px]">
          <div className="font-bold">{project?.name}</div>

          <Link href={`/dashboard/${project.id}/settings`}>Settings</Link>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </Layout>
  );
}
