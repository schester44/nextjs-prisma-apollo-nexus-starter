import { SessionProvider } from "next-auth/react";
import { Provider as UrqlProvider } from "urql";

import "src/client/styles/globals.css";
import { client } from "@client/graphql/client";

function MyApp({ Component, pageProps }) {
  return (
    <UrqlProvider value={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UrqlProvider>
  );
}

export default MyApp;
