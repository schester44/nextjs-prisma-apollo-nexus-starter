import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider as UrqlProvider } from "urql";

import "src/client/styles/globals.css";
import { client } from "@client/graphql/client";

function MyApp({ Component, pageProps }) {
  return (
    <UrqlProvider value={client}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </UrqlProvider>
  );
}

export default MyApp;
