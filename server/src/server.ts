import { hiveRouter } from "./routers/hive";
import { planRouter } from "./routers/plan";
import { userRouter } from "./routers/user";
import { mergeRouters } from "./trpc";

const appRouter = mergeRouters(userRouter, hiveRouter, planRouter);

export type AppRouter = typeof appRouter;
