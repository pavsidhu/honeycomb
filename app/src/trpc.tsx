import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/server";

const trpc = createTRPCReact<AppRouter>();
export default trpc;
