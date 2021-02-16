import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { Provider as UrqlProvider } from "urql";

import { client } from "../graphql/client";

function MyApp({ Component, pageProps }) {
  return (
    <UrqlProvider value={client}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </UrqlProvider>
  );
}

export default MyApp;
