import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { ZCreateNewExpenseInputSchema, ZGetAllExpensesInputSchema } from './expense.schema'
import { createNewExpenseHandler, getAllExpensesHandler } from './expense.handler'

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure.input(ZCreateNewExpenseInputSchema).mutation(createNewExpenseHandler),
  getAll: protectedProcedure.input(ZGetAllExpensesInputSchema).query(getAllExpensesHandler),
})
