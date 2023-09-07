import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import { ZCreateNewIncomeInputSchema, ZGetAllIncomesInputSchema } from './income.schema'
import { createNewIncomeHandler, getAllIncomesHandler } from './income.handler'

export const incomeRouter = createTRPCRouter({
  create: protectedProcedure.input(ZCreateNewIncomeInputSchema).mutation(createNewIncomeHandler),
  getAll: protectedProcedure.input(ZGetAllIncomesInputSchema).query(getAllIncomesHandler),
})
