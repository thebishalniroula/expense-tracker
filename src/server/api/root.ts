import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user/'
import { investmentRouter } from './routers/investment'
import { expenseRouter } from './routers/expense'
import { incomeRouter } from './routers/income'
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  investment: investmentRouter,
  expense: expenseRouter,
  income: incomeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
