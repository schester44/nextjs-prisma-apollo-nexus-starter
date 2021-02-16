import { createClient } from "urql";

function getToken(): string | undefined {
  return "xxx";
}

export const client = createClient({
  url: "http://localhost:3000/api/graphql",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
