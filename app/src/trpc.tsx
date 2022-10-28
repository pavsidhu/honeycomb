import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import Constants from "expo-constants";
import superjson from "superjson";

import type { AppRouter } from "../../server/src/server";

const trpc = createTRPCReact<AppRouter>();
export default trpc;

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: Constants.manifest?.extra?.apiUrl })],
  transformer: superjson,
});
