import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { useQuery } from "urql";

const MeQuery = `
  query {
    me {
      id
      email
    }

    projects {
      id
      name
    }
  }
`;

function NavBar(props) {
  const [result] = useQuery({
    query: MeQuery,
  });

  console.log(result);

  return (
    <div className="flex items-center justify-between">
      <h1>LOGO</h1>

      <div>
        <span>{props.user.email}</span>

        <button
          className="rounded bg-indigo-400 cursor hover:bg-indigo-500 text-xs text-white font-bold px-2 py-1"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function AppLayout(props) {
  const [session, loading] = useSession();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      signIn();
    }
  }, [session, loading]);

  if (loading) return <div>Loading...</div>;

  if (!session) return null;

  return (
    <div>
      <NavBar user={session.user} />
      <div>{props.children}</div>
    </div>
  );
}

export default function Home() {
  return <AppLayout>HELLO</AppLayout>;
}
