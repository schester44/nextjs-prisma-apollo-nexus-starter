import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";

function Home() {
  const [session, loading] = useSession();
  if (loading) return <div>LOADING</div>;

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Head>
        <title>Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="overflow-hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(29, 47, 67, 0.05) 19.16%, rgba(196, 196, 196, 0) 59.55%), radial-gradient(102.29% 81.78% at 50% 30%, rgba(255, 255, 255, 0) 5%, #D3DBE3 100%)",
        }}
      >
        <div className="container mx-auto flex justify-between items-center pt-4 sm:pt-8 sm:flex-row">
          <h1 className="text-xl font-black">LOGO</h1>

          <div>
            <Link href="/pricing">
              <a className="mr-3 text-gray-600 hover:text-gray-700">Pricing</a>
            </Link>
            <Link href="/docs">
              <a className="mr-3 text-gray-600 hover:text-gray-700">Docs</a>
            </Link>
            {!session ? (
              <Link href="/api/auth/signin">
                <a className="mr-3 text-gray-600 hover:text-gray-700">Sign In</a>
              </Link>
            ) : (
              <Link href="/dashboard">
                <button className="bg-gray-400 rounded px-2 py-1 text-sm cursor hover:bg-gray-600">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="container items-center max-w-full m-auto text-center mt-24 mb-12 min-h-3xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
            Your headline on this great thing
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
